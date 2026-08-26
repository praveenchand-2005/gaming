import { proposeCartRecovery, type AbandonedCart, type RecoveryProposal } from "./sales-agent.js";
import type { RecoveryProvider } from "./sales-recovery-gateway.js";

export interface SalesWorkflowResult {
  status: "no_action" | "recovery_proposed" | "recovery_sent";
  proposal: RecoveryProposal | null;
  providerMessageId?: string;
}

export function createSalesRecoveryWorkflow(provider: RecoveryProvider) {
  return async (
    input: AbandonedCart & { channel?: "email" | "whatsapp"; send?: boolean },
  ): Promise<SalesWorkflowResult> => {
    const proposal = proposeCartRecovery(input, input.channel ?? "email");
    if (!proposal) return { status: "no_action", proposal: null };
    if (!input.send) return { status: "recovery_proposed", proposal };

    const result = await provider.send(proposal);
    return { status: "recovery_sent", proposal, providerMessageId: result.providerMessageId };
  };
}
