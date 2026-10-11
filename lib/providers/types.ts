import type { DesignBrief } from "../schema";

export type GeneratedDesign = {
  imageUrl: string;
  arcadeId?: string;
  priceUsd?: number;
  makerName?: string;
};

export interface DesignProvider {
  generate(brief: DesignBrief, index: number): Promise<GeneratedDesign>;
}
