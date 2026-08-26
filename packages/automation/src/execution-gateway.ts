import type { AgentId, ProposedAction, TenantContext } from "@commerce-os/contracts";

export interface ExecutionGateway {
  execute(context: TenantContext, action: ProposedAction, agentId: AgentId): Promise<unknown>;
}
