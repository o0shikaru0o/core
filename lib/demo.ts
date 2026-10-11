import type { Order, Product, Project, Proposal } from "./types";

// Shown when DATABASE_URL isn't set, in the same shapes the bot's database produces.
const PROJECT = "-1001234567890";
const usd = (amount: string) => ({ amount, currency: "USD" });

export const demoProjects: Project[] = [{ id: PROJECT, title: "Apartment 4B", createdAt: "2026-10-11T17:00:00Z" }];

const product = (p: Partial<Product> & Pick<Product, "id" | "name" | "category" | "imageUrl" | "lore" | "explanation">): Product => ({
  projectId: PROJECT,
  world: "print",
  price: null,
  selectionLabel: null,
  loreType: "inside joke",
  quotes: [],
  votes: 0,
  createdAt: "2026-10-11T18:00:00Z",
  ...p,
});

export const demoProducts: Product[] = [
  product({
    id: "demo-rose",
    name: "The Final Rose Pocket Square",
    category: "Pocket Squares",
    imageUrl: "/demo/pattern-rose-lattice.jpg",
    price: usd("32.00"),
    lore: "Sam hands out a “final rose” at the end of every group dinner",
    explanation: "Three people reference Sam's rose ceremony, and it's become how dinners end.",
    quotes: [
      { sender: "Sam", text: "and tonight's final rose goes to… whoever paid" },
      { sender: "Mei", text: "the rose ceremony is the only reason I come to these" },
    ],
    votes: 4,
  }),
  product({
    id: "demo-mimosa",
    name: "Mimosa Incident Napkins",
    category: "Napkins",
    imageUrl: "/demo/pattern-florals.jpg",
    price: usd("18.00"),
    lore: "The brunch where Priya knocked mimosas over the entire table",
    explanation: "The group keeps calling any spill “a Priya”.",
    quotes: [
      { sender: "Ana", text: "careful, don't pull a Priya" },
      { sender: "Priya", text: "ONE TIME" },
    ],
    votes: 5,
  }),
  product({
    id: "demo-quartz",
    name: "Lucky Quartz Pendant",
    category: "Pendant Necklace",
    world: "jewelry",
    imageUrl: "/demo/necklace-garden.jpg",
    price: usd("78.00"),
    lore: "Mei's “lucky rose quartz”, which turned out to be glass",
    explanation: "Mei still swears by it; everyone else brings it up whenever luck comes up.",
    quotes: [{ sender: "Jo", text: "rub the glass for luck before the exam" }],
    votes: 3,
  }),
  product({
    id: "demo-vine",
    name: "Vine Era Necklace",
    category: "Pendant Necklace",
    world: "jewelry",
    imageUrl: "/demo/necklace-vine.jpg",
    price: usd("84.00"),
    lore: "Ana's “vine era”: the summer she filled the apartment with plants",
    explanation: "Multiple members joke about the jungle in the living room.",
    votes: 4,
  }),
  product({
    id: "demo-medallion",
    name: "House Rules Table Runner",
    category: "Table Runners",
    imageUrl: "/demo/pattern-medallion.jpg",
    price: usd("64.00"),
    lore: "The laminated list of house rules nobody follows",
    explanation: "Rule #7 (“no dishes overnight”) comes up weekly.",
    votes: 4,
  }),
];

export const demoProposals: Proposal[] = [
  { id: "demo-voting", projectId: PROJECT, lore: "Jo's 3am “quick question” voice notes", status: "voting", createdAt: "2026-10-11T19:50:00Z" },
];

export const demoOrders: Order[] = [
  { id: "demo-o1", projectId: PROJECT, productId: "demo-mimosa", buyerName: "Ana", stage: "production", orderNumber: "#1042", maker: "Hearth Textiles", tracking: [], createdAt: "2026-10-11T18:20:00Z" },
  { id: "demo-o2", projectId: PROJECT, productId: "demo-rose", buyerName: "Sam", stage: "review", orderNumber: "#1043", maker: "Loom & Line", tracking: [], createdAt: "2026-10-11T18:25:00Z" },
];
