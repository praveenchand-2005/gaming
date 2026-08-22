export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface AgentContext {
  tenantId: string;
  userId: string;
  permissions: readonly string[];
}

export interface ToolDefinition<Input, Output> {
  readonly name: string;
  readonly risk: RiskLevel;
  readonly requiredPermission: string;
  execute(input: Input, context: AgentContext): Promise<Output>;
}

export interface ApprovalPolicy {
  requiresApproval(risk: RiskLevel): boolean;
}

export class DefaultApprovalPolicy implements ApprovalPolicy {
  requiresApproval(risk: RiskLevel): boolean {
    return risk === "high" || risk === "critical";
  }
}

export function assertToolPermission(
  tool: ToolDefinition<unknown, unknown>,
  context: AgentContext,
): void {
  if (!context.permissions.includes(tool.requiredPermission)) {
    throw new Error(`Permission denied for tool: ${tool.name}`);
  }
}
