import type { DesignBrief } from "../schema";

export type GeneratedDesign = { imageUrl: string; arcadeId?: string; priceUsd?: number };

export interface DesignProvider {
  generate(brief: DesignBrief, index: number): Promise<GeneratedDesign>;
}
