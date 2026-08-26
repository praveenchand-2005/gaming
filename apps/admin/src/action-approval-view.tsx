import React, { useState } from "react";

type Action = { id:string; agent:string; title:string; explanation:string; action:string; detail:string; status:"pending"|"approved"|"rejected" };

const initial: Action[] = [
  { id:"a-1", agent:"Inventory Agent", title:"Replenishment recommended", explanation:"Everyday Hoodie / Black / M is below its reorder point.", action:"Reorder inventory", detail:"50 units · Main Warehouse", status:"pending" },
  { id:"a-2", agent:"Sales Agent", title:"Cart recovery opportunity", explanation:"Abandoned carts are eligible for recovery.", action:"Prepare recovery campaign", detail:"Email · 23 carts · ₹31,400 potential", status:"pending" },
];

export function ActionApprovalView() {
  const [actions, setActions] = useState(initial);
  const setStatus = (id:string, status:"approved"|"rejected") => setActions(xs => xs.map(x => x.id === id ? { ...x, status } : x));
  return <section className="approval-view"><div className="page-head"><div><span className="eyebrow">AUTOMATION</span><h1>Action approvals</h1><p>AI can prepare work. You decide what executes.</p></div></div><div className="approval-list">{actions.map(item => <article className="approval-card" key={item.id}><div className="approval-top"><span className="agent-tag">{item.agent}</span><span className={`badge ${item.status}`}>{item.status}</span></div><h2>{item.title}</h2><p>{item.explanation}</p><div className="approval-detail"><b>{item.action}</b><span>{item.detail}</span></div>{item.status === "pending" && <div className="approval-actions"><button onClick={() => setStatus(item.id,"rejected")}>Reject</button><button className="primary" onClick={() => setStatus(item.id,"approved")}>Approve</button><button onClick={() => alert("Review workflow will open here.")}>Review</button></div>}</article>)}</div></section>;
}
