import type { ToolHandler } from "./tool-runner.js";
import { inventoryToolHandler } from "./inventory-agent.js";
import { salesToolHandler } from "./sales-agent.js";

export function createToolRegistry(overrides: Record<string, ToolHandler> = {}) {
  return { inventory_adjustment: inventoryToolHandler, cart_recovery: salesToolHandler, ...overrides };
}
