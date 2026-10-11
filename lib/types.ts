export type Stage = "awaitingPayment" | "ordered" | "review" | "production" | "shipped" | "delivered" | "refunded";

export const PROGRESS: { id: Stage; label: string }[] = [
  { id: "ordered", label: "Ordered" },
  { id: "review", label: "Design review" },
  { id: "production", label: "In production" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
];

export const STAGE_LABEL: Record<Stage, string> = {
  awaitingPayment: "Awaiting payment",
  ordered: "Ordered",
  review: "Design review",
  production: "In production",
  shipped: "Shipped",
  delivered: "Delivered",
  refunded: "Refunded",
};

const ARCADE_STATUS_TO_STAGE: Record<string, Stage> = {
  ordered: "ordered",
  cadReview: "review",
  sampleReview: "review",
  inProduction: "production",
  inReview: "production",
  inCorrection: "production",
  approved: "production",
  updatedInfo: "production",
  shipped: "shipped",
  delivered: "delivered",
  fulfilled: "delivered",
  refunded: "refunded",
};

export const stageFromArcade = (status: string): Stage => ARCADE_STATUS_TO_STAGE[status] ?? "ordered";

export type Price = { amount: string; currency: string };

export type Project = { id: string; title: string; createdAt: string };

// One lore proposal that the group voted into a real Arcade product.
export type Product = {
  id: string;
  projectId: string;
  name: string;
  category: string;
  world: string;
  imageUrl: string | null;
  price: Price | null;
  selectionLabel: string | null;
  lore: string;
  loreType: string;
  explanation: string;
  quotes: { sender: string; text: string }[];
  votes: number;
  createdAt: string;
};

// A lore proposal that hasn't become a product (yet).
export type Proposal = { id: string; projectId: string; lore: string; status: string; createdAt: string };

export type Order = {
  id: string;
  projectId: string;
  productId: string;
  buyerName: string;
  stage: Stage;
  orderNumber: string | null;
  maker: string | null;
  tracking: { company: string | null; number: string | null; url: string | null }[];
  createdAt: string;
};

export const formatPrice = (p: Price | null) =>
  p ? new Intl.NumberFormat("en-US", { style: "currency", currency: p.currency }).format(Number(p.amount)) : null;

export const buyLink = (productId: string) =>
  `https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "CoreBot"}?start=buy_${productId}`;
