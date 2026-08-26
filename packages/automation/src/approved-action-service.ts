import type { AgentId, ProposedAction, TenantContext } from "@commerce-os/contracts";
import type { ActionRepository } from "./action-repository.js";
import type { ExecutionGateway } from "./execution-gateway.js";

export class ApprovedActionService {
  constructor(private readonly actions: ActionRepository, private readonly gateway: ExecutionGateway) {}

  async approveAndExecute(context: TenantContext, actionId: string, agentId: AgentId) {
    const action = await this.actions.get(context.tenantId, actionId);
    if (!action) throw new Error("Action not found");
    if (action.tenantId !== context.tenantId) throw new Error("Tenant mismatch");
    const approved = action.requiresApproval ? await this.actions.approve(context.tenantId, actionId) : action;
    return this.gateway.execute(context, approved, agentId);
  }
}
