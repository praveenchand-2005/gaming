import { audit, type ActionAudit } from "./audit-log.js";
import { approveAction, proposeAction, type AutomationAction, type ProposedAction } from "./action-policy.js";

export interface ActionAuditStore { append(record: ActionAudit): Promise<void>; }

export class ActionService {
  constructor(private readonly audits: ActionAuditStore) {}

  async propose(tenantId: string, insightId: string, action: AutomationAction, parameters: Record<string, unknown>) {
    const proposed = proposeAction({ tenantId, insightId, action, parameters });
    await this.audits.append(audit({ tenantId, actionId: proposed.id, actor: "ai", operation: "proposed", metadata: { action, parameters } }));
    return proposed;
  }

  async approve(action: ProposedAction) {
    const approved = approveAction(action);
    await this.audits.append(audit({ tenantId: approved.tenantId, actionId: approved.id, actor: "user", operation: "approved", metadata: {} }));
    return approved;
  }
}
