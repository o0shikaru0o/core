import type { DesignProvider } from "./types";

export const imageProvider: DesignProvider = {
  async generate(brief) {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.IMAGE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: brief.imagePrompt,
        size: "1024x1024",
        quality: "medium",
        n: 1,
      }),
    });
    if (!res.ok) throw new Error(`Image API ${res.status}: ${await res.text()}`);
    const json = await res.json();
    return { imageUrl: `data:image/png;base64,${json.data[0].b64_json}` };
  },
};
