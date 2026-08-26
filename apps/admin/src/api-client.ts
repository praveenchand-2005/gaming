export interface ApiClientOptions {
  baseUrl: string;
  tenantId: string;
  userId: string;
  role: "owner" | "admin" | "manager" | "staff" | "viewer";
}

export function createApiClient(options: ApiClientOptions) {
  const headers = { "content-type": "application/json", "x-tenant-id": options.tenantId, "x-user-id": options.userId, "x-user-role": options.role };
  return {
    async createProduct(input: { storeId: string; title: string; handle: string; description?: string }) {
      const response = await fetch(`${options.baseUrl}/products`, { method: "POST", headers, body: JSON.stringify({ tenantId: options.tenantId, ...input }) });
      if (!response.ok) throw new Error(`Product request failed: ${response.status}`);
      return response.json();
    },
    async createOrder(input: { storeId: string; customerId?: string; currency: string; items: Array<{ variantId: string; quantity: number; unitPriceMinor: number }> }) {
      const response = await fetch(`${options.baseUrl}/orders`, { method: "POST", headers, body: JSON.stringify({ tenantId: options.tenantId, ...input }) });
      if (!response.ok) throw new Error(`Order request failed: ${response.status}`);
      return response.json();
    },
    async approveAction(actionId: string, agentId: "sales" | "inventory" | "marketing" | "finance" | "support") {
      const response = await fetch(`${options.baseUrl}/actions/${encodeURIComponent(actionId)}/approve`, { method: "POST", headers, body: JSON.stringify({ agentId }) });
      if (!response.ok) throw new Error(`Action approval failed: ${response.status}`);
      return response.json();
    },
  };
}
