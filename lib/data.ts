import { Pool } from "pg";
import { freshImageUrl, orderForCheckout } from "./arcade";
import { demoOrders, demoProducts, demoProjects, demoProposals } from "./demo";
import { stageFromArcade, type Order, type Product, type Project, type Proposal } from "./types";

// Reads the Core bot's Postgres database (tables owned by the bot, see docs/INTEGRATION.md).
// Without DATABASE_URL the app shows demo data.
const g = globalThis as unknown as { corePool?: Pool };
const pool = process.env.DATABASE_URL
  ? (g.corePool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 3 }))
  : null;

// Rows come from tables the bot defines, so they are loosely typed here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

async function query<T = Row>(sql: string, params: unknown[] = []): Promise<T[]> {
  return (await pool!.query(sql, params)).rows as T[];
}

const iso = (d: Date | string) => new Date(d).toISOString();

function toProject(row: Row): Project {
  return { id: String(row.chat_id), title: row.title || "Telegram group", createdAt: iso(row.created_at) };
}

async function toProduct(row: Row): Promise<Product> {
  const details = row.details ?? {};
  return {
    id: row.proposal_id,
    projectId: String(row.chat_id),
    name: details.title || row.category?.name || "Core product",
    category: row.category?.name ?? "",
    world: row.category?.world ?? "",
    imageUrl: await freshImageUrl(row.arcade_product_id, row.image_url),
    price: row.price ?? null,
    selectionLabel: details.selectionLabel ?? null,
    lore: row.lore?.lore ?? "",
    loreType: row.lore?.type ?? "",
    explanation: row.lore?.explanation ?? "",
    quotes: [],
    votes: 0,
    createdAt: iso(row.created_at),
  };
}

const PRODUCT_SQL = `
  select gp.proposal_id, gp.arcade_product_id, gp.category, gp.price, gp.image_url, gp.details, gp.created_at,
         lp.chat_id, lp.lore, lp.round, lp.categories, lp.winner
  from generated_products gp join lore_proposals lp on lp.id = gp.proposal_id`;

export async function listProjects(): Promise<Project[]> {
  if (!pool) return demoProjects;
  return (await query("select * from groups order by created_at desc")).map(toProject);
}

export async function getProject(projectId: string): Promise<Project | undefined> {
  if (!pool) return demoProjects.find((p) => p.id === projectId);
  if (!/^-?\d+$/.test(projectId)) return undefined;
  const [row] = await query("select * from groups where chat_id = $1", [projectId]);
  return row && toProject(row);
}

export async function listProducts(projectId?: string): Promise<Product[]> {
  if (!pool) return demoProducts.filter((p) => !projectId || p.projectId === projectId);
  const rows = projectId
    ? await query(`${PRODUCT_SQL} where lp.chat_id = $1 order by gp.created_at desc`, [projectId])
    : await query(`${PRODUCT_SQL} order by gp.created_at desc`);
  return Promise.all(rows.map(toProduct));
}

export async function getProduct(productId: string): Promise<Product | undefined> {
  if (!pool) return demoProducts.find((p) => p.id === productId);
  const [row] = await query(`${PRODUCT_SQL} where gp.proposal_id = $1`, [productId]);
  if (!row) return undefined;
  const product = await toProduct(row);

  const evidence: number[] = row.lore?.evidence_message_ids ?? [];
  if (evidence.length) {
    const messages = await query(
      "select sender_name, text from messages where chat_id = $1 and telegram_message_id = any($2) order by timestamp",
      [row.chat_id, evidence],
    );
    product.quotes = messages.map((m) => ({ sender: m.sender_name, text: m.text }));
  }

  const winnerIndex = (row.categories ?? []).findIndex((c: { categoryId?: string }) => c.categoryId === row.winner?.categoryId);
  const [{ count }] = await query<{ count: string }>(
    "select count(*) from votes where proposal_id = $1 and round = $2 and choice = $3",
    [productId, row.round, winnerIndex],
  );
  product.votes = Number(count);
  return product;
}

// Lore that is still being voted on or generated, shown as "coming up" on the project page.
export async function listPendingProposals(projectId: string): Promise<Proposal[]> {
  if (!pool) return demoProposals.filter((p) => p.projectId === projectId);
  const rows = await query(
    "select id, chat_id, lore, status, created_at from lore_proposals where chat_id = $1 and status in ('voting', 'generating') order by created_at desc",
    [projectId],
  );
  return rows.map((r) => ({ id: r.id, projectId: String(r.chat_id), lore: r.lore?.lore ?? "", status: r.status, createdAt: iso(r.created_at) }));
}

// Each "Get yours" checkout the bot created. Needs the bot's `checkouts` table.
export async function listOrders(filter: { productId?: string } = {}): Promise<Order[]> {
  if (!pool) return demoOrders.filter((o) => !filter.productId || o.productId === filter.productId);
  let rows: Row[];
  try {
    rows = filter.productId
      ? await query("select * from checkouts where proposal_id = $1 order by created_at desc", [filter.productId])
      : await query("select * from checkouts order by created_at desc");
  } catch {
    return []; // table not created by the bot yet
  }
  return Promise.all(rows.map(toOrder));
}

export async function getOrder(orderId: string): Promise<Order | undefined> {
  if (!pool) return demoOrders.find((o) => o.id === orderId);
  try {
    const [row] = await query("select * from checkouts where id::text = $1", [orderId]);
    return row && toOrder(row);
  } catch {
    return undefined;
  }
}

async function toOrder(row: Row): Promise<Order> {
  const arcadeOrder = await orderForCheckout(row.arcade_checkout_id);
  return {
    id: String(row.id),
    projectId: String(row.chat_id),
    productId: row.proposal_id,
    buyerName: row.buyer_name ?? "A member",
    stage: arcadeOrder ? stageFromArcade(arcadeOrder.status) : "awaitingPayment",
    orderNumber: arcadeOrder?.orderNumber ?? null,
    maker: arcadeOrder?.lines[0]?.makerName ?? null,
    tracking: arcadeOrder?.tracking ?? [],
    createdAt: iso(row.created_at),
  };
}
