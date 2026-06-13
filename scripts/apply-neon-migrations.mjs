import fs from "node:fs";
import path from "node:path";
import { neon } from "@neondatabase/serverless";

const migrations = [
  "sql/006-leads.sql",
  "sql/007-lead-attribution-pipeline.sql",
];

function loadEnvLocal() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) {
    throw new Error(".env.local not found. Set DATABASE_URL locally before applying migrations.");
  }

  const raw = fs.readFileSync(envPath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    const [, key, value] = match;
    if (!(key in process.env)) process.env[key] = value;
  }
}

function stripLineComments(sql) {
  return sql
    .split(/\r?\n/)
    .map((line) => line.replace(/--.*$/, ""))
    .join("\n");
}

function splitStatements(sql) {
  const statements = [];
  let current = "";
  let inDollarBlock = false;

  for (let i = 0; i < sql.length; i += 1) {
    const pair = sql.slice(i, i + 2);
    if (pair === "$$") {
      inDollarBlock = !inDollarBlock;
      current += pair;
      i += 1;
      continue;
    }

    const char = sql[i];
    if (char === ";" && !inDollarBlock) {
      const statement = current.trim();
      if (statement) statements.push(statement);
      current = "";
      continue;
    }

    current += char;
  }

  const tail = current.trim();
  if (tail) statements.push(tail);
  return statements;
}

async function main() {
  loadEnvLocal();

  if (process.env.LEAD_STORAGE_PROVIDER !== "neon") {
    throw new Error("LEAD_STORAGE_PROVIDER must be set to neon in .env.local.");
  }

  if (!process.env.DATABASE_URL || !/^postgres(?:ql)?:\/\//.test(process.env.DATABASE_URL)) {
    throw new Error("DATABASE_URL is missing or invalid in .env.local.");
  }

  const sql = neon(process.env.DATABASE_URL);

  for (const migration of migrations) {
    const raw = fs.readFileSync(path.resolve(process.cwd(), migration), "utf8");
    const statements = splitStatements(stripLineComments(raw));
    for (const statement of statements) {
      await sql.query(statement, []);
    }
    console.log(`applied ${migration}; statements=${statements.length}`);
  }

  const rows = await sql`
    select
      count(*)::int as row_count,
      exists(
        select 1
        from information_schema.columns
        where table_schema = 'public'
          and table_name = 'leads'
          and column_name = 'ai_call_summary'
      ) as has_ai_call_summary,
      exists(
        select 1
        from information_schema.columns
        where table_schema = 'public'
          and table_name = 'leads'
          and column_name = 'commission_amount'
      ) as has_commission_amount
    from public.leads
  `;

  console.log(JSON.stringify(rows[0]));
}

main().catch((err) => {
  console.error(`migration failed: ${err.message}`);
  process.exit(1);
});
