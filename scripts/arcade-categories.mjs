const base = process.env.ARCADE_API_BASE || "https://platform.arcade.ai/v1";

const res = await fetch(`${base}/categories/list`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.ARCADE_API_KEY}`,
    "Content-Type": "application/json",
    "User-Agent": "gaise/0.1 (shopping-3.0-hackathon)",
  },
  body: "{}",
});

if (!res.ok) {
  console.error(`HTTP ${res.status}: ${await res.text()}`);
  process.exit(1);
}

const { items } = await res.json();
for (const c of items.filter((c) => c.world === "jewelry")) {
  console.log(`${c.name.padEnd(28)} ${c.category?.name ?? ""}`.trim(), `\n  ${c.categoryId}`);
}
