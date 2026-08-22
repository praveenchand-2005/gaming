export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface AgentToolContext {
  tenantId: string;
  userId: string;
  permissions: ReadonlySet<string>;
}

export interface AgentTool<TInput = unknown, TOutput = unknown> {
  name: string;
  description: string;
  risk: RiskLevel;
  requiredPermission: string;
  execute(input: TInput, context: AgentToolContext): Promise<TOutput>;
}

export interface ApprovalPolicy {
  requiresApproval(risk: RiskLevel, autonomousMode: boolean): boolean;
}

export const defaultApprovalPolicy: ApprovalPolicy = {
  requiresApproval(risk, autonomousMode) {
    if (!autonomousMode) return true;
    return risk === "high" || risk === "critical";
  },
};
