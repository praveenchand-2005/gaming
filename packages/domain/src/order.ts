import type { CreateOrderCommand, OrderId } from "./commerce.js";

export interface BuiltOrder {
  id: OrderId;
  tenantId: string;
  storeId: string;
  customerId?: string;
  status: "pending";
  currency: string;
  subtotalMinor: number;
  totalMinor: number;
  items: Array<{ variantId: string; quantity: number; unitPriceMinor: number; totalMinor: number }>;
  occurredAt: string;
}

export function buildOrder(command: CreateOrderCommand, now = new Date().toISOString()): BuiltOrder {
  if (command.items.length === 0) throw new Error("Order must contain at least one item");
  if (!command.currency || command.currency.length !== 3) throw new Error("Currency must be a 3-letter code");

  const items = command.items.map((item) => {
    if (!Number.isInteger(item.quantity) || item.quantity <= 0) throw new Error("Quantity must be a positive integer");
    if (!Number.isInteger(item.unitPriceMinor) || item.unitPriceMinor < 0) throw new Error("Unit price must be non-negative minor units");
    return { ...item, totalMinor: item.quantity * item.unitPriceMinor };
  });
  const totalMinor = items.reduce((sum, item) => sum + item.totalMinor, 0);
  return { id: crypto.randomUUID(), tenantId: command.tenantId, storeId: command.storeId, customerId: command.customerId,
    status: "pending", currency: command.currency.toUpperCase(), subtotalMinor: totalMinor, totalMinor, items, occurredAt: now };
}
