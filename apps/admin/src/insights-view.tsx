import React, { useEffect, useState } from "react";

interface Insight { id:string; severity:"info"|"warning"|"critical"; title:string; explanation:string; recommendedAction:string; }

export function InsightsView({ baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000" }: { baseUrl?: string }) {
  const [items, setItems] = useState<Insight[]>([]); const [error, setError] = useState("");
  useEffect(() => { fetch(`${baseUrl}/insights`, { headers: { "x-tenant-id": import.meta.env.VITE_TENANT_ID ?? "demo-tenant", "x-user-id": import.meta.env.VITE_USER_ID ?? "demo-user", "x-user-role": "owner" } }).then(r => { if (!r.ok) throw new Error(`Insights request failed: ${r.status}`); return r.json(); }).then(setItems).catch(e => setError(e instanceof Error ? e.message : "Unable to load insights")); }, [baseUrl]);
  return <div className="insights-panel"><div className="panel-head"><h2>Needs attention</h2><span>{items.length} insights</span></div>{error && <p className="error">{error}</p>}{!error && items.length === 0 && <p>No new actions right now.</p>}{items.map(item => <div className="action" key={item.id}><div><b>{item.title}</b><p>{item.explanation}</p><small>Recommended: {item.recommendedAction}</small></div><span className={`badge ${item.severity}`}>{item.severity}</span></div>)}</div>;
}
