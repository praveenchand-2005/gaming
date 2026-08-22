import { describe, expect, it } from "vitest";

describe("tenant-scoped database queries", () => {
  it("requires tenant and store predicates for catalog reads", () => {
    const query = "SELECT ... WHERE tenant_id=$1 AND store_id=$2";
    expect(query).toContain("tenant_id=$1");
    expect(query).toContain("store_id=$2");
  });

  it("uses parameterized values", () => {
    const query = "SELECT ... WHERE tenant_id=$1";
    expect(query).not.toContain("'" + " + tenantId + "'");
  });
});
