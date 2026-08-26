import { describe, expect, it } from "vitest";
import { InMemoryActionRepository } from "./action-repository.js";

describe("action repository", () => {
  it("approves only the requested tenant action", async () => {
    const repo = new InMemoryActionRepository();
    await repo.save({ id:"a1", tenantId:"t1", insightId:"i1", action:"reorder_inventory", parameters:{ quantity:10 }, requiresApproval:true });
    expect((await repo.approve("t1", "a1")).requiresApproval).toBe(false);
    expect(await repo.get("t2", "a1")).toBeNull();
  });
});
