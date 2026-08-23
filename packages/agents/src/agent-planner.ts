import { agents, type AgentId } from "./agent-contract.js";
import type { ProposedAction } from "@commerce-os/automation/action-policy.js";

export interface AgentPlan { agentId: AgentId; objective: string; actions: ProposedAction[]; requiresHumanApproval: boolean; }

export function createPlan(agentId: AgentId, objective: string, actions: ProposedAction[]): AgentPlan {
  if (!agents.some(agent => agent.id === agentId)) throw new Error("Unknown agent");
  return { agentId, objective: objective.trim(), actions, requiresHumanApproval: actions.some(action => action.requiresApproval) };
}
