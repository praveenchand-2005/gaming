export type FulfillmentStatus = "unfulfilled" | "processing" | "fulfilled" | "cancelled";

const transitions: Record<FulfillmentStatus, readonly FulfillmentStatus[]> = {
  unfulfilled: ["processing", "cancelled"],
  processing: ["fulfilled", "cancelled"],
  fulfilled: [],
  cancelled: [],
};

export function transitionFulfillment(current: FulfillmentStatus, next: FulfillmentStatus): FulfillmentStatus {
  if (!transitions[current].includes(next)) throw new Error(`Invalid fulfillment transition: ${current} -> ${next}`);
  return next;
}
