import type { Pool } from "pg";
import type { BuiltProduct } from "@commerce-os/domain/product.js";

export class PostgresProductRepository {
  constructor(private readonly pool: Pool) {}

  async save(product: BuiltProduct): Promise<void> {
    await this.pool.query(
      `INSERT INTO products (id, tenant_id, store_id, title, handle, description, status, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$8)`,
      [product.id, product.tenantId, product.storeId, product.title, product.handle, product.description, product.status, product.createdAt],
    );
  }

  async update(tenantId: string, id: string, patch: { title?: string; description?: string; status?: string }): Promise<void> {
    await this.pool.query(
      `UPDATE products SET title=COALESCE($3,title), description=COALESCE($4,description), status=COALESCE($5,status), updated_at=now()
       WHERE tenant_id=$1 AND id=$2`,
      [tenantId, id, patch.title ?? null, patch.description ?? null, patch.status ?? null],
    );
  }

  async delete(tenantId: string, id: string): Promise<void> {
    await this.pool.query(`DELETE FROM products WHERE tenant_id=$1 AND id=$2`, [tenantId, id]);
  }
}
