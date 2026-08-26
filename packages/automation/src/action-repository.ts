import type { ProposedAction } from "./action-policy.js";

export interface ActionRepository {
  save(action: ProposedAction): Promise<void>;
  get(tenantId: string, actionId: string): Promise<ProposedAction | null>;
  approve(tenantId: string, actionId: string): Promise<ProposedAction>;
}

export class InMemoryActionRepository implements ActionRepository {
  private readonly actions = new Map<string, ProposedAction>();
  async save(action: ProposedAction) { this.actions.set(`${action.tenantId}:${action.id}`, action); }
  async get(tenantId: string, actionId: string) { return this.actions.get(`${tenantId}:${actionId}`) ?? null; }
  async approve(tenantId: string, actionId: string) {
    const action = await this.get(tenantId, actionId); if (!action) throw new Error("Action not found");
    const approved = { ...action, requiresApproval: false }; await this.save(approved); return approved;
  }
}
