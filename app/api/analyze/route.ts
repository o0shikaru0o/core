import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { buildUserText, SYSTEM_PROMPT } from "@/lib/prompt";
import { AnalysisSchema, AnalyzeRequestSchema } from "@/lib/schema";

export const maxDuration = 60;

const client = new Anthropic();
const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5-5";

type ImageMediaType = "image/jpeg" | "image/png" | "image/webp" | "image/gif";

function toImageBlock(dataUrl: string): Anthropic.ImageBlockParam {
  const [, mediaType, data] = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/) ?? [];
  if (!data) throw new Error("Photos must be base64 data URLs");
  return {
    type: "image",
    source: { type: "base64", media_type: mediaType as ImageMediaType, data },
  };
}

function extractJson(text: string) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  return JSON.parse(text.slice(start, end + 1));
}

export async function POST(req: Request) {
  const parsed = AnalyzeRequestSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const messages: Anthropic.MessageParam[] = [
    {
      role: "user",
      content: [
        ...parsed.data.photos.map(toImageBlock),
        { type: "text", text: buildUserText(parsed.data) },
      ],
    },
  ];

  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages,
    });
    const text = res.content.map((b) => (b.type === "text" ? b.text : "")).join("");
    try {
      return NextResponse.json(AnalysisSchema.parse(extractJson(text)));
    } catch {
      messages.push(
        { role: "assistant", content: text },
        { role: "user", content: "Return only valid JSON matching the schema." },
      );
    }
  }

  return NextResponse.json({ error: "Model did not return valid JSON" }, { status: 502 });
}
