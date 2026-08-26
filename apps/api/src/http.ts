export interface CreateProductRequest {
  tenantId: string;
  storeId: string;
  title: string;
  handle: string;
  description?: string;
}

export interface CreateOrderRequest {
  tenantId: string;
  storeId: string;
  customerId?: string;
  currency: string;
  items: Array<{ variantId: string; quantity: number; unitPriceMinor: number }>;
}

export interface ApiError { code: string; message: string; }

export function requireBody<T extends object>(body: unknown): T {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Request body must be an object");
  return body as T;
}

export function requireTenant(body: { tenantId?: unknown }): string {
  if (typeof body.tenantId !== "string" || !body.tenantId.trim()) throw new Error("tenantId is required");
  return body.tenantId.trim();
}
