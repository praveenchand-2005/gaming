export interface ActionAudit { id: string; tenantId: string; actionId: string; actor: "ai" | "user" | "system"; operation: "proposed" | "approved" | "executed" | "rejected"; occurredAt: string; metadata: Record<string, unknown>; }

export function audit(input: Omit<ActionAudit, "id" | "occurredAt">): ActionAudit {
  return { ...input, id: crypto.randomUUID(), occurredAt: new Date().toISOString() };
}
