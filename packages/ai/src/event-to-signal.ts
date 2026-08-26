import type { CommerceSignal } from "./commerce-insights.js";

export interface CommerceEvent { type: string; payload: Record<string, unknown>; }

export function signalFromEvent(event: CommerceEvent): CommerceSignal | null {
  if (event.type === "inventory.low") return { kind: "low_stock", value: Number(event.payload.available ?? 0), entityId: String(event.payload.variantId ?? "") };
  if (event.type === "cart.abandoned") return { kind: "cart_recovery", value: Number(event.payload.count ?? 0) };
  if (event.type === "conversion.changed") return { kind: "conversion_drop", value: Number(event.payload.current ?? 0), baseline: Number(event.payload.baseline ?? 0) };
  if (event.type === "revenue.changed") return { kind: "revenue_change", value: Number(event.payload.current ?? 0), baseline: Number(event.payload.baseline ?? 0) };
  return null;
}
