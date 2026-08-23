import type { AgentId, ProposedAction } from "@commerce-os/contracts";
import type { TenantContext } from "@commerce-os/auth/tenant-context.js";

export interface ExecutionGateway {
  execute(context: TenantContext, action: ProposedAction, agentId: AgentId): Promise<unknown>;
}
