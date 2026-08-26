import { describe, expect, it } from "vitest";
import { createInventoryWorkflow } from "./inventory-workflow.js";

function repository() {
  return {
    async getLevel() {
      return { tenantId: "t1", variantId: "v1", locationId: "l1", available: 3, reserved: 1 };
    },
    async saveLevel() {},
  };
}

describe("inventory reorder workflow", () => {
  it("proposes a reorder when stock is at or below the reorder point", async () => {
    const run = createInventoryWorkflow(repository(), "t1");
    const result = await run({ variantId: "v1", locationId: "l1", reorderPoint: 5, reorderQuantity: 10 });

    expect(result.status).toBe("reorder_proposed");
    expect(result.proposal?.quantity).toBe(10);
  });

  it("does not propose a reorder when stock is healthy", async () => {
    const repo = { ...repository(), async getLevel() { return { tenantId: "t1", variantId: "v1", locationId: "l1", available: 8, reserved: 0 }; } };
    const run = createInventoryWorkflow(repo, "t1");
    const result = await run({ variantId: "v1", locationId: "l1", reorderPoint: 5, reorderQuantity: 10 });

    expect(result.status).toBe("no_action");
    expect(result.proposal).toBeNull();
  });
});
