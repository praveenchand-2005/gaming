export interface RecoveryMessage { cartId: string; customerId?: string; channel: "email"|"whatsapp"; currency: string; valueMinor: number; }
export interface RecoveryProvider { send(message: RecoveryMessage): Promise<{ providerMessageId: string; status: "accepted" }>; }

export function createSalesRecoveryHandler(provider: RecoveryProvider) {
  return async (input: Record<string, unknown>) => {
    const message = input as unknown as RecoveryMessage;
    if (!message.cartId || !message.channel || message.valueMinor <= 0) throw new Error("Invalid recovery message");
    return provider.send(message);
  };
}
