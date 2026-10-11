export type Stage = "ordered" | "review" | "production" | "shipped" | "delivered";

export const STAGES: { id: Stage; label: string }[] = [
  { id: "ordered", label: "Ordered" },
  { id: "review", label: "Design review" },
  { id: "production", label: "In production" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
];

export type Product = { id: string; name: string; category: string; image: string; priceUsd: number };

export type Order = { id: string; productId: string; quantity: number; stage: Stage };

export type Project = {
  id: string;
  name: string;
  chat: string;
  members: number;
  emoji: string;
  products: Product[];
  orders: Order[];
};

export const projects: Project[] = [
  {
    id: "priya-sam-wedding",
    name: "Priya & Sam's Wedding",
    chat: "Telegram group",
    members: 9,
    emoji: "💍",
    products: [
      { id: "p1", name: "Garden Rose Pendant", category: "Pendant Necklace", image: "/demo/necklace-garden.jpg", priceUsd: 78 },
      { id: "p2", name: "Rose Lattice Pocket Square", category: "Pocket Squares", image: "/demo/pattern-rose-lattice.jpg", priceUsd: 32 },
      { id: "p3", name: "Vine Drop Necklace", category: "Pendant Necklace", image: "/demo/necklace-vine.jpg", priceUsd: 84 },
      { id: "p4", name: "Garden Floral Napkins", category: "Napkins", image: "/demo/pattern-florals.jpg", priceUsd: 18 },
      { id: "p5", name: "Medallion Table Runner", category: "Table Runners", image: "/demo/pattern-medallion.jpg", priceUsd: 64 },
    ],
    orders: [
      { id: "1042", productId: "p1", quantity: 5, stage: "production" },
      { id: "1043", productId: "p2", quantity: 4, stage: "review" },
    ],
  },
];

export const projectById = (id: string) => projects.find((p) => p.id === id);
export const stageIndex = (stage: Stage) => STAGES.findIndex((s) => s.id === stage);
export const stageLabel = (stage: Stage) => STAGES[stageIndex(stage)].label;
