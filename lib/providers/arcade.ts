import { arcade, categoryFor, waitForJob, type ArcadeJob, type ArcadeProduct } from "../arcade";
import type { DesignProvider } from "./types";

export const arcadeProvider: DesignProvider = {
  async generate(brief) {
    const categoryId = await categoryFor(brief.pieceType);
    const prompt = `${brief.name}. ${brief.pieceType}, ${brief.materials}. ${brief.imagePrompt}`.slice(0, 1000);

    const job = await arcade<ArcadeJob>("patterns/create", {
      requestId: crypto.randomUUID(),
      prompt,
      categoryId,
    });
    const done = await waitForJob(job.jobId);
    const productId = done.result?.productId;
    if (!productId) throw new Error("Arcade job finished without a product");

    const product = await arcade<ArcadeProduct>("products/get", { productId });
    const imageUrl = product.images?.[0]?.url ?? product.imageUrl;
    if (!imageUrl) throw new Error("Arcade product has no image");

    return {
      imageUrl,
      arcadeId: productId,
      priceUsd: product.unitPrice ? Number(product.unitPrice.amount) : undefined,
      makerName: product.maker?.name,
    };
  },
};
