import type { Pool } from "pg";
import type { ActionAudit } from "./audit-log.js";

export class PostgresActionAuditRepository {
  constructor(private readonly pool: Pool) {}

  async append(record: ActionAudit): Promise<void> {
    await this.pool.query(
      `INSERT INTO action_audit (id, tenant_id, action_id, actor, operation, occurred_at, metadata)
       VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb)`,
      [record.id, record.tenantId, record.actionId, record.actor, record.operation, record.occurredAt, JSON.stringify(record.metadata)],
    );
  }
}
