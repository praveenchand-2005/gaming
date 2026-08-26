import type { InventoryRepository } from "@commerce-os/application/inventory-service.js";
import type { ToolHandler } from "./tool-runner.js";
import { inventoryToolHandler } from "./inventory-agent.js";
import { createInventoryWorkflow } from "./inventory-workflow.js";
import { salesToolHandler } from "./sales-agent.js";
import { createSalesRecoveryWorkflow } from "./sales-workflow.js";
import type { RecoveryProvider } from "./sales-recovery-gateway.js";

export function createToolRegistry(overrides: Record<string, ToolHandler> = {}) {
  return { inventory_adjustment: inventoryToolHandler, cart_recovery: salesToolHandler, ...overrides };
}

export function createCommerceToolRegistry(
  repository: InventoryRepository,
  tenantId: string,
  recoveryProvider: RecoveryProvider,
  overrides: Record<string, ToolHandler> = {},
) {
  return {
    ...createToolRegistry(overrides),
    inventory_reorder: createInventoryWorkflow(repository, tenantId),
    cart_recovery_workflow: createSalesRecoveryWorkflow(recoveryProvider),
  };
}
