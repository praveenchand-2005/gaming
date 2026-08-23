import type { Pool } from "pg";

export class PostgresCustomerRepository {
  constructor(private readonly pool: Pool) {}

  async save(customer: { id:string; tenantId:string; storeId:string; email:string; firstName?:string; lastName?:string; createdAt:string; updatedAt:string }) {
    await this.pool.query(`INSERT INTO customers (id,tenant_id,email,first_name,last_name,created_at,updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7)`, [customer.id,customer.tenantId,customer.email,customer.firstName ?? null,customer.lastName ?? null,customer.createdAt,customer.updatedAt]);
  }

  async list(tenantId: string, limit = 50) {
    const result = await this.pool.query(`SELECT id,tenant_id,email,first_name,last_name,created_at FROM customers WHERE tenant_id=$1 ORDER BY created_at DESC LIMIT $2`, [tenantId, limit]);
    return result.rows;
  }
}
