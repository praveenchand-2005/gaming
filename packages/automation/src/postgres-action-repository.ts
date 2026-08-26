import type { Pool } from "pg";
import type { ProposedAction } from "./action-policy.js";
import type { ActionRepository } from "./action-repository.js";

export class PostgresActionRepository implements ActionRepository {
  constructor(private readonly pool: Pool) {}

  async save(action: ProposedAction): Promise<void> {
    await this.pool.query(
      `INSERT INTO automation_actions (id, tenant_id, insight_id, action, parameters, requires_approval)
       VALUES ($1,$2,$3,$4,$5::jsonb,$6)
       ON CONFLICT (id) DO UPDATE SET parameters=$5::jsonb, requires_approval=$6, updated_at=now()
       WHERE automation_actions.tenant_id=$2`,
      [action.id, action.tenantId, action.insightId, action.action, JSON.stringify(action.parameters), action.requiresApproval],
    );
  }

  async get(tenantId: string, actionId: string): Promise<ProposedAction | null> {
    const result = await this.pool.query(
      `SELECT id, tenant_id, insight_id, action, parameters, requires_approval
       FROM automation_actions WHERE tenant_id=$1 AND id=$2`,
      [tenantId, actionId],
    );
    const row = result.rows[0];
    if (!row) return null;
    return { id: row.id, tenantId: row.tenant_id, insightId: row.insight_id, action: row.action, parameters: row.parameters, requiresApproval: row.requires_approval };
  }

  async approve(tenantId: string, actionId: string): Promise<ProposedAction> {
    const result = await this.pool.query(
      `UPDATE automation_actions SET requires_approval=false, approved_at=now(), updated_at=now()
       WHERE tenant_id=$1 AND id=$2 AND requires_approval=true
       RETURNING id, tenant_id, insight_id, action, parameters, requires_approval`,
      [tenantId, actionId],
    );
    const row = result.rows[0];
    if (!row) throw new Error("Action not found or already approved");
    return { id: row.id, tenantId: row.tenant_id, insightId: row.insight_id, action: row.action, parameters: row.parameters, requiresApproval: row.requires_approval };
  }
}
