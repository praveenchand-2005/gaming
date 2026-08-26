import React from "react";
import { agents } from "@commerce-os/agents/agent-contract.js";

export function AgentsView() {
  return <section className="products-view"><div className="page-head"><div><span className="eyebrow">AI EMPLOYEES</span><h1>AI Employees</h1><p>Specialized agents with explicit tools and permissions.</p></div></div><div className="grid">{agents.map(agent => <article key={agent.id}><span className="label">AI EMPLOYEE</span><strong>{agent.name}</strong><p>{agent.purpose}</p><small>{agent.tools.length} approved tool definitions · human approval for actions</small></article>)}</div></section>;
}
