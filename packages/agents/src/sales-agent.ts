export interface AbandonedCart { cartId: string; customerId?: string; valueMinor: number; currency: string; abandonedAt: string; }
export interface RecoveryProposal { cartId: string; customerId?: string; valueMinor: number; currency: string; channel: "email" | "whatsapp"; reason: string; }

export function proposeCartRecovery(cart: AbandonedCart, channel: "email" | "whatsapp" = "email"): RecoveryProposal | null {
  if (cart.valueMinor <= 0) return null;
  return { cartId: cart.cartId, customerId: cart.customerId, valueMinor: cart.valueMinor, currency: cart.currency.toUpperCase(), channel, reason: `Cart has been abandoned since ${cart.abandonedAt}.` };
}

export function salesToolHandler(input: Record<string, unknown>): Promise<RecoveryProposal | null> {
  const cart = input as unknown as AbandonedCart;
  return Promise.resolve(proposeCartRecovery(cart, input.channel === "whatsapp" ? "whatsapp" : "email"));
}
