import { adjustAvailable, reserve, type InventoryLevel } from "@commerce-os/domain/inventory.js";

export interface InventoryRepository {
  getLevel(tenantId: string, variantId: string, locationId: string): Promise<InventoryLevel | null>;
  saveLevel(level: InventoryLevel): Promise<void>;
}

export class InventoryService {
  constructor(private readonly repository: InventoryRepository) {}

  async adjust(tenantId: string, variantId: string, locationId: string, delta: number) {
    const current = await this.repository.getLevel(tenantId, variantId, locationId) ?? { tenantId, variantId, locationId, available: 0, reserved: 0 };
    const next = adjustAvailable(current, delta);
    await this.repository.saveLevel(next);
    return next;
  }

  async reserve(tenantId: string, variantId: string, locationId: string, quantity: number) {
    const current = await this.repository.getLevel(tenantId, variantId, locationId);
    if (!current) throw new Error("Inventory level not found");
    const next = reserve(current, quantity);
    await this.repository.saveLevel(next);
    return next;
  }
}
