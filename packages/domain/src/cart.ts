export interface AbandonedCartRecord { id: string; tenantId: string; customerId?: string; email?: string; valueMinor: number; currency: string; abandonedAt: string; recoveryStatus: "eligible" | "prepared" | "sent" | "recovered" | "suppressed"; }

export function prepareRecovery(cart: AbandonedCartRecord) {
  if (cart.recoveryStatus !== "eligible") throw new Error("Cart is not eligible for recovery");
  if (cart.valueMinor <= 0) throw new Error("Cart value must be positive");
  return { cartId: cart.id, tenantId: cart.tenantId, customerId: cart.customerId, email: cart.email, valueMinor: cart.valueMinor, currency: cart.currency.toUpperCase() };
}
