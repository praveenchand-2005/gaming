import { generateInsight, type CommerceSignal } from "./commerce-insights.js";
import { InsightStore } from "./insight-store.js";

export class CommerceInsightHandler {
  constructor(private readonly store: InsightStore) {}

  handle(tenantId: string, signal: CommerceSignal): void {
    const insight = generateInsight(signal);
    if (insight) this.store.add(tenantId, insight);
  }
}
