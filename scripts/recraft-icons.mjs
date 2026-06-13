import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

async function loadLocalEnv() {
  try {
    const envText = await readFile(path.join(process.cwd(), ".env.local"), "utf8");
    for (const line of envText.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)\s*$/);
      if (!match || process.env[match[1]]) continue;
      process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
    }
  } catch {
    // .env.local is optional; normal process env still works.
  }
}

await loadLocalEnv();

const token = process.env.RECRAFT_API_TOKEN || process.env.RECRAFT_API_KEY;

if (!token) {
  console.error("RECRAFT_API_TOKEN is not set. Add it to your local environment or .env.local before running.");
  process.exit(1);
}

const outputDir = path.join(process.cwd(), "public", "icons", "recraft");

const iconPrompts = [
  ["vertical-platform-lift.svg", "minimal vector line icon of an ADA vertical platform lift, navy stroke, gold small accent, teal secondary accent, no text, no background"],
  ["stair-lift.svg", "minimal vector line icon of a stair lift chair on a rail, navy stroke, gold small accent, teal secondary accent, no text, no background"],
  ["ada-ramp.svg", "minimal vector line icon of an ADA wheelchair ramp with handrails, navy stroke, gold small accent, teal secondary accent, no text, no background"],
  ["site-assessment.svg", "minimal vector line icon of a clipboard site assessment with measuring mark and check, navy stroke, gold small accent, teal secondary accent, no text, no background"],
];

await mkdir(outputDir, { recursive: true });

for (const [fileName, prompt] of iconPrompts) {
  const response = await fetch("https://external.api.recraft.ai/v1/images/generations", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      model: "recraftv4_vector",
      response_format: "url",
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Recraft failed for ${fileName}: ${response.status} ${body}`);
  }

  const json = await response.json();
  const url = json?.data?.[0]?.url;
  if (!url) {
    throw new Error(`Recraft response did not include a URL for ${fileName}`);
  }

  const assetResponse = await fetch(url);
  if (!assetResponse.ok) {
    throw new Error(`Could not download generated asset for ${fileName}: ${assetResponse.status}`);
  }

  const svg = await assetResponse.text();
  await writeFile(path.join(outputDir, fileName), svg, "utf8");
  console.log(`Wrote public/icons/recraft/${fileName}`);
}
