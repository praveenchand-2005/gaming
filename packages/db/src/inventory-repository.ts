import type { Pool } from "pg";
import type { InventoryLevel } from "@commerce-os/domain/inventory.js";

export class PostgresInventoryRepository {
  constructor(private readonly pool: Pool) {}

  async getLevel(tenantId: string, variantId: string, locationId: string): Promise<InventoryLevel | null> {
    const result = await this.pool.query(
      `SELECT tenant_id, variant_id, location_id, available, reserved FROM inventory_levels
       WHERE tenant_id=$1 AND variant_id=$2 AND location_id=$3`,
      [tenantId, variantId, locationId],
    );
    if (!result.rows[0]) return null;
    const row = result.rows[0];
    return { tenantId: row.tenant_id, variantId: row.variant_id, locationId: row.location_id, available: row.available, reserved: row.reserved };
  }

  async saveLevel(level: InventoryLevel): Promise<void> {
    await this.pool.query(
      `INSERT INTO inventory_levels (tenant_id, variant_id, location_id, available, reserved, updated_at)
       VALUES ($1,$2,$3,$4,$5,now())
       ON CONFLICT (variant_id, location_id) DO UPDATE SET available=$4, reserved=$5, updated_at=now()
       WHERE inventory_levels.tenant_id=$1`,
      [level.tenantId, level.variantId, level.locationId, level.available, level.reserved],
    );
  }
}
