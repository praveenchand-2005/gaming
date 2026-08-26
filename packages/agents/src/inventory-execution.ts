import type { InventoryRepository } from "@commerce-os/application/inventory-service.js";

export interface InventoryReorderInput { variantId: string; locationId: string; quantity: number; }

export function createInventoryReorderHandler(repository: InventoryRepository, tenantId: string) {
  if (!tenantId.trim()) throw new Error("Tenant is required");
  return async (input: Record<string, unknown>) => {
    const value = input as unknown as InventoryReorderInput;
    if (!Number.isInteger(value.quantity) || value.quantity <= 0) throw new Error("Reorder quantity must be positive");
    const current = await repository.getLevel(tenantId, value.variantId, value.locationId);
    if (!current) throw new Error("Inventory level not found");
    return { status: "prepared", variantId: value.variantId, locationId: value.locationId, quantity: value.quantity, currentAvailable: current.available, tenantId };
  };
}
