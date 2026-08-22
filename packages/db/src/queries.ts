import type { Pool } from "pg";

export interface ProductRow { id: string; tenantId: string; storeId: string; title: string; handle: string; status: string; }
export interface OrderRow { id: string; tenantId: string; storeId: string; customerId: string | null; status: string; currency: string; totalMinor: number; createdAt: string; }

export class CommerceQueries {
  constructor(private readonly pool: Pool) {}

  async listProducts(tenantId: string, storeId: string, limit = 50): Promise<ProductRow[]> {
    const result = await this.pool.query(`SELECT id, tenant_id, store_id, title, handle, status FROM products WHERE tenant_id=$1 AND store_id=$2 ORDER BY created_at DESC LIMIT $3`, [tenantId, storeId, limit]);
    return result.rows.map(row => ({ id: row.id, tenantId: row.tenant_id, storeId: row.store_id, title: row.title, handle: row.handle, status: row.status }));
  }

  async listOrders(tenantId: string, storeId: string, limit = 50): Promise<OrderRow[]> {
    const result = await this.pool.query(`SELECT id, tenant_id, store_id, customer_id, status, currency, total_minor, created_at FROM orders WHERE tenant_id=$1 AND store_id=$2 ORDER BY created_at DESC LIMIT $3`, [tenantId, storeId, limit]);
    return result.rows.map(row => ({ id: row.id, tenantId: row.tenant_id, storeId: row.store_id, customerId: row.customer_id, status: row.status, currency: row.currency, totalMinor: Number(row.total_minor), createdAt: row.created_at.toISOString() }));
  }
}
