import { arcadeProvider } from "./arcade";
import { cachedProvider } from "./cached";
import { imageProvider } from "./image";
import type { DesignProvider } from "./types";

const providers: Record<string, DesignProvider> = {
  arcade: arcadeProvider,
  image: imageProvider,
  cached: cachedProvider,
};

export function getProvider(): DesignProvider {
  return providers[process.env.DESIGN_PROVIDER ?? "image"] ?? imageProvider;
}
