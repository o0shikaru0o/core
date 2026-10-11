import { arcadeProvider } from "./arcade";
import { cachedProvider } from "./cached";
import { imageProvider } from "./image";
import type { DesignProvider } from "./types";

const withFallback = (primary: DesignProvider, fallback: DesignProvider): DesignProvider => ({
  async generate(brief, index) {
    try {
      return await primary.generate(brief, index);
    } catch (e) {
      console.error(`Primary provider failed for design ${index}, falling back:`, e);
      return fallback.generate(brief, index);
    }
  },
});

export function getProvider(): DesignProvider {
  switch (process.env.DESIGN_PROVIDER) {
    case "arcade":
      return process.env.IMAGE_API_KEY ? withFallback(arcadeProvider, imageProvider) : arcadeProvider;
    case "cached":
      return cachedProvider;
    default:
      return imageProvider;
  }
}
