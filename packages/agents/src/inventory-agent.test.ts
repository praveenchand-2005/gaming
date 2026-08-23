import { describe, expect, it } from "vitest";
import { proposeReorder } from "./inventory-agent.js";

describe("Inventory Agent", () => {
  it("proposes reorder at the reorder point", () => {
    const result = proposeReorder({ variantId:"v1", locationId:"l1", available:10, reserved:2, reorderPoint:10, reorderQuantity:50 });
    expect(result?.quantity).toBe(50);
  });
  it("does not propose reorder when stock is healthy", () => {
    expect(proposeReorder({ variantId:"v1", locationId:"l1", available:11, reserved:0, reorderPoint:10, reorderQuantity:50 })).toBeNull();
  });
});
