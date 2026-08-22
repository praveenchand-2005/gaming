import type { CommerceService } from "@commerce-os/application";
import { permissions } from "@commerce-os/auth/permissions.js";
import { authenticate, requirePermission } from "./auth-middleware.js";
import { requireBody, type CreateOrderRequest, type CreateProductRequest } from "./http.js";

export function createSecureCommerceRoutes(service: CommerceService) {
  return {
    async createProduct(headers: Record<string, string | undefined>, body: unknown) {
      const context = authenticate(headers);
      requirePermission(context, permissions.productsWrite);
      const request = requireBody<CreateProductRequest>(body);
      if (request.tenantId !== context.tenantId) throw new Error("Tenant mismatch");
      return service.createProduct(request);
    },
    async createOrder(headers: Record<string, string | undefined>, body: unknown) {
      const context = authenticate(headers);
      requirePermission(context, permissions.ordersWrite);
      const request = requireBody<CreateOrderRequest>(body);
      if (request.tenantId !== context.tenantId) throw new Error("Tenant mismatch");
      return service.createOrder(request);
    },
  };
}
