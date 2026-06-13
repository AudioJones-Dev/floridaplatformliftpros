-- 007-lead-attribution-pipeline.sql
-- Adds first-party tracking fields for AI prequalification, partner handoff,
-- closed-deal confirmation, and commission reconciliation.
-- Idempotent: safe to re-run after 006-leads.sql.

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS ai_call_summary TEXT,
  ADD COLUMN IF NOT EXISTS qualification_fit TEXT,
  ADD COLUMN IF NOT EXISTS partner_name TEXT,
  ADD COLUMN IF NOT EXISTS partner_handoff_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS partner_handoff_notes TEXT,
  ADD COLUMN IF NOT EXISTS deal_specs TEXT,
  ADD COLUMN IF NOT EXISTS estimated_deal_value TEXT,
  ADD COLUMN IF NOT EXISTS commission_status TEXT,
  ADD COLUMN IF NOT EXISTS commission_amount TEXT,
  ADD COLUMN IF NOT EXISTS closed_at TIMESTAMPTZ;

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_status_check;
ALTER TABLE leads
  ADD CONSTRAINT leads_status_check
  CHECK (status IN (
    'new',
    'contacted',
    'ai_prequalified',
    'qualified',
    'handed_off',
    'quoted',
    'won',
    'lost',
    'spam'
  ));

CREATE INDEX IF NOT EXISTS leads_partner_name_idx ON leads (partner_name);
CREATE INDEX IF NOT EXISTS leads_partner_handoff_at_idx ON leads (partner_handoff_at DESC);
CREATE INDEX IF NOT EXISTS leads_commission_status_idx ON leads (commission_status);
