import { z } from "zod";

export const PIECE_TYPES = ["earrings", "necklace", "ring", "bracelet", "brooch"] as const;
export const FORMALITY = ["casual", "smart", "cocktail", "formal", "black-tie"] as const;

export const DesignBriefSchema = z.object({
  name: z.string(),
  pieceType: z.enum(PIECE_TYPES),
  materials: z.string(),
  stylistNote: z.string(),
  imagePrompt: z.string(),
  priceEstimateUsd: z.tuple([z.number(), z.number()]),
});

export const AnalysisSchema = z.object({
  outfit: z.object({
    summary: z.string(),
    colors: z.array(z.string()),
    neckline: z.string(),
    fabric: z.string(),
    silhouette: z.string(),
    formality: z.enum(FORMALITY),
  }),
  occasion: z.object({ summary: z.string() }),
  taste: z.object({ summary: z.string(), keywords: z.array(z.string()) }),
  direction: z.string(),
  designs: z.array(DesignBriefSchema).min(2).max(3),
});

export const AnalyzeRequestSchema = z.object({
  occasion: z.string().min(1),
  date: z.string().optional(),
  photos: z.array(z.string()).min(1).max(3),
  liked: z.array(z.string()),
  passed: z.array(z.string()),
});

export const GenerateRequestSchema = z.object({
  briefs: z.array(DesignBriefSchema).min(1).max(3),
});

export type DesignBrief = z.infer<typeof DesignBriefSchema>;
export type Analysis = z.infer<typeof AnalysisSchema>;
export type AnalyzeRequest = z.infer<typeof AnalyzeRequestSchema>;

export type Design = DesignBrief & {
  imageUrl: string;
  arcadeId?: string;
  priceUsd?: number;
  makerName?: string;
};
