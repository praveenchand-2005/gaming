CREATE TABLE IF NOT EXISTS automation_actions (
  id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  insight_id uuid NOT NULL,
  action text NOT NULL CHECK (action IN ('reorder_inventory','launch_cart_recovery','adjust_price')),
  parameters jsonb NOT NULL DEFAULT '{}'::jsonb,
  requires_approval boolean NOT NULL DEFAULT true,
  approved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_automation_actions_tenant ON automation_actions(tenant_id, created_at DESC);

CREATE TABLE IF NOT EXISTS action_audits (
  id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  action_id uuid NOT NULL REFERENCES automation_actions(id) ON DELETE CASCADE,
  actor text NOT NULL CHECK (actor IN ('ai','user','system')),
  operation text NOT NULL CHECK (operation IN ('proposed','approved','executed','rejected')),
  occurred_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_action_audits_tenant_time ON action_audits(tenant_id, occurred_at DESC);
