export async function approveAction(baseUrl: string, actionId: string, agentId: "sales"|"inventory"|"marketing"|"finance"|"support") {
  const response = await fetch(`${baseUrl}/actions/${encodeURIComponent(actionId)}/approve`, { method: "POST", headers: { "content-type": "application/json", "x-tenant-id": import.meta.env.VITE_TENANT_ID ?? "demo-tenant", "x-user-id": import.meta.env.VITE_USER_ID ?? "demo-user", "x-user-role": "owner" }, body: JSON.stringify({ agentId }) });
  if (!response.ok) throw new Error(`Action execution failed: ${response.status}`);
  return response.json();
}
