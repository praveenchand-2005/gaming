export type AutomationAction = "reorder_inventory" | "launch_cart_recovery" | "adjust_price";

export interface ProposedAction { id: string; tenantId: string; insightId: string; action: AutomationAction; parameters: Record<string, unknown>; requiresApproval: boolean; }

export function proposeAction(input: Omit<ProposedAction, "id" | "requiresApproval">): ProposedAction {
  return { ...input, id: crypto.randomUUID(), requiresApproval: true };
}

export function approveAction(action: ProposedAction): ProposedAction {
  return { ...action, requiresApproval: false };
}
