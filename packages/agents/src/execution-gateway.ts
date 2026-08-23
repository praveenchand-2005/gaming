import type { ProposedAction, AgentId } from "@commerce-os/contracts";
import type { TenantContext } from "@commerce-os/auth/tenant-context.js";
import { AgentToolRunner } from "./tool-runner.js";

export class AgentExecutionGateway {
  constructor(private readonly runner: AgentToolRunner) {}

  async execute(context: TenantContext, action: ProposedAction, agentId: AgentId) {
    if (action.requiresApproval) throw new Error("Action requires approval");
    return this.runner.execute(context, {
      agentId,
      toolName: action.action === "reorder_inventory"
        ? "inventory_adjustment"
        : action.action === "launch_cart_recovery"
          ? "cart_recovery"
          : "campaign_draft",
      tenantId: action.tenantId,
      input: action.parameters,
    });
  }
}
