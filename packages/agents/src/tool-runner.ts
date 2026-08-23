import { agents, type AgentId } from "./agent-contract.js";
import type { TenantContext } from "@commerce-os/auth/tenant-context.js";

export interface ToolExecution { agentId: AgentId; toolName: string; tenantId: string; input: Record<string, unknown>; }
export type ToolHandler = (input: Record<string, unknown>) => Promise<unknown>;

export class AgentToolRunner {
  constructor(private readonly handlers: Record<string, ToolHandler>) {}

  async execute(context: TenantContext, request: ToolExecution): Promise<unknown> {
    if (context.tenantId !== request.tenantId) throw new Error("Tenant mismatch");
    const agent = agents.find(item => item.id === request.agentId);
    if (!agent) throw new Error("Unknown agent");
    const tool = agent.tools.find(item => item.name === request.toolName);
    if (!tool) throw new Error("Tool not allowed for agent");
    if (!context.permissions.includes("*") && !context.permissions.includes(tool.permission)) throw new Error("Permission denied");
    const handler = this.handlers[request.toolName];
    if (!handler) throw new Error("Tool handler unavailable");
    return handler(request.input);
  }
}
