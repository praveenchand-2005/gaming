export interface InventoryLevel {
  tenantId: string;
  variantId: string;
  locationId: string;
  available: number;
  reserved: number;
}

export function adjustAvailable(level: InventoryLevel, delta: number): InventoryLevel {
  const next = level.available + delta;
  if (!Number.isInteger(delta)) throw new Error("Inventory adjustment must be an integer");
  if (next < 0) throw new Error("Inventory cannot become negative");
  return { ...level, available: next };
}

export function reserve(level: InventoryLevel, quantity: number): InventoryLevel {
  if (!Number.isInteger(quantity) || quantity <= 0) throw new Error("Reservation quantity must be positive");
  if (level.available < quantity) throw new Error("Insufficient inventory");
  return { ...level, available: level.available - quantity, reserved: level.reserved + quantity };
}
