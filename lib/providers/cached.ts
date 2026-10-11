import type { DesignProvider } from "./types";

export const cachedProvider: DesignProvider = {
  async generate(_brief, index) {
    return { imageUrl: `/demo/design-${index}.png` };
  },
};
