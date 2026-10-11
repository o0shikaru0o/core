import type { DesignProvider } from "./types";

export const arcadeProvider: DesignProvider = {
  async generate() {
    throw new Error("ArcadeProvider not implemented yet");
  },
};
