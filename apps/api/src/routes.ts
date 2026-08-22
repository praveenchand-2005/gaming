import type { CommerceService } from "@commerce-os/application";
import { requireBody, requireTenant, type CreateOrderRequest, type CreateProductRequest } from "./http.js";

export function createCommerceRoutes(service: CommerceService) {
  return {
    async createProduct(body: unknown) {
      const request = requireBody<CreateProductRequest>(body);
      const tenantId = requireTenant(request);
      return service.createProduct({ tenantId, storeId: request.storeId, title: request.title, handle: request.handle, description: request.description });
    },
    async createOrder(body: unknown) {
      const request = requireBody<CreateOrderRequest>(body);
      const tenantId = requireTenant(request);
      return service.createOrder({ tenantId, storeId: request.storeId, customerId: request.customerId, currency: request.currency, items: request.items });
    },
  };
}
