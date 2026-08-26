export interface InventoryRead { variantId: string; locationId: string; available: number; reserved: number; reorderPoint: number; reorderQuantity: number; }
export interface ReorderProposal { variantId: string; locationId: string; quantity: number; reason: string; }

export function proposeReorder(level: InventoryRead): ReorderProposal | null {
  if (level.available > level.reorderPoint) return null;
  if (!Number.isInteger(level.reorderQuantity) || level.reorderQuantity <= 0) throw new Error("Invalid reorder quantity");
  return { variantId: level.variantId, locationId: level.locationId, quantity: level.reorderQuantity, reason: `Available stock (${level.available}) is at or below reorder point (${level.reorderPoint}).` };
}

export function inventoryToolHandler(input: Record<string, unknown>): Promise<ReorderProposal | null> {
  const level = input as unknown as InventoryRead;
  return Promise.resolve(proposeReorder(level));
}
