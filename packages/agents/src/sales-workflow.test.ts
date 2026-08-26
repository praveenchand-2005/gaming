import { describe, expect, it } from "vitest";
import { createSalesRecoveryWorkflow } from "./sales-workflow.js";

describe("Sales Agent cart recovery workflow", () => {
  const provider = {
    send: async (message: { cartId: string }) => ({ providerMessageId: `msg-${message.cartId}`, status: "accepted" as const }),
  };

  it("proposes recovery without sending", async () => {
    const workflow = createSalesRecoveryWorkflow(provider);
    const result = await workflow({ cartId: "c1", valueMinor: 2500, currency: "inr", abandonedAt: "2026-08-26T06:00:00Z" });
    expect(result.status).toBe("recovery_proposed");
    expect(result.proposal?.channel).toBe("email");
  });

  it("sends recovery through the provider when requested", async () => {
    const workflow = createSalesRecoveryWorkflow(provider);
    const result = await workflow({ cartId: "c2", customerId: "u1", valueMinor: 5000, currency: "INR", abandonedAt: "2026-08-26T06:00:00Z", channel: "whatsapp", send: true });
    expect(result.status).toBe("recovery_sent");
    expect(result.providerMessageId).toBe("msg-c2");
  });
});
