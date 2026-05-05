// Admin token guard for /admin/leads + PATCH /api/leads/:id.
//
// Hard rule: in production, missing or mismatched token → deny.
// In development, missing token still allows access but logs a warning so
// the operator notices before deploying.

export type AdminAuth =
  | { ok: true; mode: "prod-token" | "dev-warn" | "dev-token" }
  | { ok: false; reason: "missing" | "mismatch" };

export function checkAdminAuth(provided: string | null | undefined): AdminAuth {
  const expected = process.env.ADMIN_ACCESS_TOKEN;
  const isProd = process.env.NODE_ENV === "production";

  if (!expected) {
    if (isProd) return { ok: false, reason: "missing" };
    if (process.env.NODE_ENV !== "test") {
      console.warn(
        "[admin] ADMIN_ACCESS_TOKEN not set — allowing access in dev only. Set this env var before deploying."
      );
    }
    return { ok: true, mode: "dev-warn" };
  }

  if (!provided) return { ok: false, reason: "missing" };
  if (provided !== expected) return { ok: false, reason: "mismatch" };

  return { ok: true, mode: isProd ? "prod-token" : "dev-token" };
}
