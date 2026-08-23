import type { Pool } from "pg";
import type { AbandonedCartRecord } from "@commerce-os/domain/cart.js";

export class PostgresCartRepository {
  constructor(private readonly pool: Pool) {}

  async getEligible(tenantId: string, cartId: string): Promise<AbandonedCartRecord | null> {
    const result = await this.pool.query(
      `SELECT id, tenant_id, customer_id, email, value_minor, currency, abandoned_at, recovery_status
       FROM abandoned_carts WHERE tenant_id=$1 AND id=$2 AND recovery_status='eligible'`,
      [tenantId, cartId],
    );
    const row = result.rows[0];
    if (!row) return null;
    return { id: row.id, tenantId: row.tenant_id, customerId: row.customer_id ?? undefined, email: row.email ?? undefined, valueMinor: Number(row.value_minor), currency: row.currency, abandonedAt: row.abandoned_at.toISOString(), recoveryStatus: row.recovery_status };
  }

  async markPrepared(tenantId: string, cartId: string): Promise<void> {
    await this.pool.query(`UPDATE abandoned_carts SET recovery_status='prepared', updated_at=now() WHERE tenant_id=$1 AND id=$2 AND recovery_status='eligible'`, [tenantId, cartId]);
  }
}
