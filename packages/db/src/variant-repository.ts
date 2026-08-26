import type { Pool } from "pg";
import type { ProductVariantDraft } from "@commerce-os/domain/variant.js";

export class PostgresVariantRepository {
  constructor(private readonly pool: Pool) {}

  async save(variant: ProductVariantDraft & { id: string }): Promise<void> {
    await this.pool.query(
      `INSERT INTO product_variants (id, tenant_id, product_id, sku, title, price_minor, currency)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [variant.id, variant.tenantId, variant.productId, variant.sku, variant.title, variant.priceMinor, variant.currency],
    );
  }

  async listByProduct(tenantId: string, productId: string) {
    const result = await this.pool.query(
      `SELECT id, tenant_id, product_id, sku, title, price_minor, cost_minor, currency
       FROM product_variants WHERE tenant_id=$1 AND product_id=$2 ORDER BY title`,
      [tenantId, productId],
    );
    return result.rows;
  }
}
