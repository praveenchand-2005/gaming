export type AutomationAction = "reorder_inventory" | "launch_cart_recovery" | "adjust_price";

export interface ProposedAction {
  id: string;
  tenantId: string;
  insightId: string;
  action: AutomationAction;
  parameters: Record<string, unknown>;
  requiresApproval: boolean;
}

export type AgentId = "sales" | "inventory" | "marketing" | "finance" | "support";
