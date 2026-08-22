import type { BuiltOrder } from "@commerce-os/domain/order.js";
import type { BuiltProduct } from "@commerce-os/domain/product.js";

export interface ProductRepository {
  saveProduct(product: BuiltProduct): Promise<void>;
}

export interface OrderRepository {
  saveOrder(order: BuiltOrder): Promise<void>;
}

export interface CommerceRepository extends ProductRepository, OrderRepository {}

export interface TenantScopedQuery {
  tenantId: string;
}

export function requireTenantId(query: TenantScopedQuery): string {
  const tenantId = query.tenantId.trim();
  if (!tenantId) throw new Error("tenantId is required");
  return tenantId;
}
