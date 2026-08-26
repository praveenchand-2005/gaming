import { inventoryToolHandler } from "./inventory-agent.js";
import { salesToolHandler } from "./sales-agent.js";
import type { ToolHandler } from "./tool-runner.js";

export const defaultAgentTools: Record<string, ToolHandler> = {
  inventory_adjustment: inventoryToolHandler,
  cart_recovery: salesToolHandler,
};
