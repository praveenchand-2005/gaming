import type { CommerceInsight } from "./commerce-insights.js";

export class InsightStore {
  private readonly data = new Map<string, CommerceInsight[]>();

  add(tenantId: string, insight: CommerceInsight): void {
    const existing = this.data.get(tenantId) ?? [];
    this.data.set(tenantId, [insight, ...existing].slice(0, 100));
  }

  list(tenantId: string, limit = 20): CommerceInsight[] {
    return (this.data.get(tenantId) ?? []).slice(0, limit);
  }
}
