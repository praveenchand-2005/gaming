import type { InventoryRepository } from "@commerce-os/application/inventory-service.js";
import { proposeReorder, type InventoryRead, type ReorderProposal } from "./inventory-agent.js";

export interface InventoryWorkflowResult {
  status: "no_action" | "reorder_proposed";
  proposal: ReorderProposal | null;
}

export function createInventoryWorkflow(repository: InventoryRepository, tenantId: string) {
  if (!tenantId.trim()) throw new Error("Tenant is required");

  return async (input: Omit<InventoryRead, "available" | "reserved"> & { variantId: string; locationId: string }) => {
    const current = await repository.getLevel(tenantId, input.variantId, input.locationId);
    if (!current) throw new Error("Inventory level not found");

    const proposal = proposeReorder({
      ...input,
      available: current.available,
      reserved: current.reserved,
    });

    return {
      status: proposal ? "reorder_proposed" : "no_action",
      proposal,
    } satisfies InventoryWorkflowResult;
  };
}
