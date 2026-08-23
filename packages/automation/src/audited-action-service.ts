import { audit, type ActionAudit } from "./audit-log.js";
import type { ActionRepository } from "./action-repository.js";
import type { AgentExecutionGateway } from "@commerce-os/agents/execution-gateway.js";
import type { TenantContext } from "@commerce-os/auth/tenant-context.js";

export interface AuditWriter { append(record: ActionAudit): Promise<void>; }

export class AuditedActionService {
  constructor(private readonly actions: ActionRepository, private readonly gateway: AgentExecutionGateway, private readonly audits: AuditWriter) {}

  async approveAndExecute(context: TenantContext, actionId: string, agentId: "sales"|"inventory"|"marketing"|"finance"|"support") {
    const action = await this.actions.get(context.tenantId, actionId);
    if (!action) throw new Error("Action not found");
    if (action.tenantId !== context.tenantId) throw new Error("Tenant mismatch");
    const approved = action.requiresApproval ? await this.actions.approve(context.tenantId, actionId) : action;
    await this.audits.append(audit({ tenantId: context.tenantId, actionId, actor: "user", operation: "approved", metadata: { agentId } }));
    try {
      const result = await this.gateway.execute(context, approved, agentId);
      await this.audits.append(audit({ tenantId: context.tenantId, actionId, actor: "system", operation: "executed", metadata: { agentId, result } }));
      return result;
    } catch (error) {
      await this.audits.append(audit({ tenantId: context.tenantId, actionId, actor: "system", operation: "rejected", metadata: { agentId, error: error instanceof Error ? error.message : "Execution failed" } }));
      throw error;
    }
  }
}
