export type InsightSeverity = "info" | "warning" | "critical";

export interface CommerceSignal {
  kind: "low_stock" | "cart_recovery" | "conversion_drop" | "revenue_change";
  value: number;
  baseline?: number;
  entityId?: string;
}

export interface CommerceInsight {
  id: string;
  severity: InsightSeverity;
  title: string;
  explanation: string;
  recommendedAction: string;
  sourceSignal: CommerceSignal["kind"];
}

export function generateInsight(signal: CommerceSignal): CommerceInsight | null {
  if (signal.kind === "low_stock" && signal.value <= 5) return { id: crypto.randomUUID(), severity: "critical", title: "Stockout risk", explanation: `Only ${signal.value} units remain.`, recommendedAction: "Review replenishment or transfer stock.", sourceSignal: signal.kind };
  if (signal.kind === "conversion_drop" && signal.baseline && signal.value < signal.baseline * 0.9) return { id: crypto.randomUUID(), severity: "warning", title: "Conversion dropped", explanation: `Conversion is ${signal.value}, below the ${signal.baseline} baseline.`, recommendedAction: "Inspect recent traffic, pricing and product-page changes.", sourceSignal: signal.kind };
  if (signal.kind === "cart_recovery" && signal.value > 0) return { id: crypto.randomUUID(), severity: "info", title: "Recovery opportunity", explanation: `${signal.value} abandoned carts are eligible for recovery.`, recommendedAction: "Review a recovery campaign before sending it.", sourceSignal: signal.kind };
  return null;
}
