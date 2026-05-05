-- 006-leads.sql
-- Lead pipeline core table — applied via Neon SQL Editor (or any psql client connected to DATABASE_URL).
-- Idempotent: safe to re-run.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS leads (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Contact identity
  name            TEXT,
  first_name      TEXT,
  last_name       TEXT,
  email           TEXT,
  phone           TEXT,

  -- Intent
  service_needed  TEXT,
  property_type   TEXT,
  timeline        TEXT,
  message         TEXT,

  -- Geography
  county          TEXT,
  city            TEXT,

  -- Attribution
  lead_source_page TEXT,
  utm_source      TEXT,
  utm_medium      TEXT,
  utm_campaign    TEXT,

  -- Pipeline state
  status          TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'contacted', 'qualified', 'quoted', 'won', 'lost', 'spam')),
  priority        TEXT NOT NULL DEFAULT 'normal'
    CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  assigned_to     TEXT,
  notes           TEXT
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx  ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx      ON leads (status);
CREATE INDEX IF NOT EXISTS leads_priority_idx    ON leads (priority);
CREATE INDEX IF NOT EXISTS leads_email_idx       ON leads (email);
CREATE INDEX IF NOT EXISTS leads_phone_idx       ON leads (phone);

-- Auto-update updated_at on row changes.
CREATE OR REPLACE FUNCTION leads_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS leads_updated_at_trigger ON leads;
CREATE TRIGGER leads_updated_at_trigger
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION leads_set_updated_at();
