export type PaymentStatus = "unpaid" | "paid" | "refunded";
export type OrderLifecycle = "pending" | "paid" | "fulfilled" | "cancelled" | "refunded";

const transitions: Record<OrderLifecycle, readonly OrderLifecycle[]> = {
  pending: ["paid", "cancelled"],
  paid: ["fulfilled", "refunded", "cancelled"],
  fulfilled: ["refunded"],
  cancelled: [],
  refunded: [],
};

export function transitionOrder(current: OrderLifecycle, next: OrderLifecycle): OrderLifecycle {
  if (!transitions[current].includes(next)) throw new Error(`Invalid order transition: ${current} -> ${next}`);
  return next;
}
