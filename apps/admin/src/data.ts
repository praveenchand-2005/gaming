import { createApiClient } from "./api-client.js";

export const commerceApi = createApiClient({
  baseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
  tenantId: import.meta.env.VITE_TENANT_ID ?? "demo-tenant",
  userId: import.meta.env.VITE_USER_ID ?? "demo-user",
  role: "owner",
});

export interface ProductRecord { id: string; title: string; handle: string; status: string; }
export interface OrderRecord { id: string; totalMinor: number; currency: string; status: string; }
