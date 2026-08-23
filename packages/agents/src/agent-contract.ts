export type AgentId = "sales" | "inventory" | "marketing" | "finance" | "support";

export interface AgentTool { name: string; permission: string; description: string; }
export interface AgentDefinition { id: AgentId; name: string; purpose: string; tools: readonly AgentTool[]; }

export const agents: readonly AgentDefinition[] = [
  { id: "sales", name: "Sales Agent", purpose: "Identify revenue opportunities and prepare approved actions.", tools: [{ name: "cart_recovery", permission: "ai:execute", description: "Prepare cart recovery campaigns." }] },
  { id: "inventory", name: "Inventory Agent", purpose: "Detect stock risk and prepare replenishment actions.", tools: [{ name: "inventory_adjustment", permission: "inventory:write", description: "Prepare inventory adjustments." }] },
  { id: "marketing", name: "Marketing Agent", purpose: "Analyze campaigns and prepare optimization actions.", tools: [{ name: "campaign_draft", permission: "ai:execute", description: "Draft campaign changes." }] },
  { id: "finance", name: "Finance Agent", purpose: "Explain financial performance and flag anomalies.", tools: [{ name: "finance_report", permission: "analytics:read", description: "Read financial analytics." }] },
  { id: "support", name: "Support Agent", purpose: "Prepare customer-support responses and workflows.", tools: [{ name: "customer_lookup", permission: "customers:read", description: "Read customer context." }] },
];
