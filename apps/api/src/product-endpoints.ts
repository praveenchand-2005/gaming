import { permissions } from "@commerce-os/auth/permissions.js";
import { authenticate, requirePermission } from "./auth-middleware.js";
import { requireBody } from "./http.js";
import type { CommerceQueries } from "@commerce-os/db/queries.js";
import type { PostgresProductRepository } from "@commerce-os/db/product-repository.js";
import type { PostgresVariantRepository } from "@commerce-os/db/variant-repository.js";
import type { PostgresInventoryRepository } from "@commerce-os/db/inventory-repository.js";
import { buildVariant } from "@commerce-os/domain/variant.js";

export function createProductEndpoints(deps: { queries: CommerceQueries; products: PostgresProductRepository; variants: PostgresVariantRepository; inventory: PostgresInventoryRepository }) {
  return {
    async listProducts(headers: Record<string,string|undefined>, storeId: string) {
      const context = authenticate(headers); requirePermission(context, permissions.productsRead);
      return deps.queries.listProducts(context.tenantId, storeId);
    },
    async listVariants(headers: Record<string,string|undefined>, productId: string) {
      const context = authenticate(headers); requirePermission(context, permissions.productsRead);
      return deps.variants.listByProduct(context.tenantId, productId);
    },
    async createVariant(headers: Record<string,string|undefined>, body: unknown) {
      const context = authenticate(headers); requirePermission(context, permissions.productsWrite);
      const input = requireBody<{ productId:string; sku:string; title:string; priceMinor:number; currency:string }>(body);
      const variant = buildVariant({ tenantId: context.tenantId, ...input });
      await deps.variants.save(variant); return variant;
    },
    async adjustInventory(headers: Record<string,string|undefined>, body: unknown) {
      const context = authenticate(headers); requirePermission(context, permissions.inventoryWrite);
      const input = requireBody<{ variantId:string; locationId:string; delta:number }>(body);
      const current = await deps.inventory.getLevel(context.tenantId, input.variantId, input.locationId) ?? { tenantId: context.tenantId, variantId: input.variantId, locationId: input.locationId, available: 0, reserved: 0 };
      const next = { ...current, available: current.available + input.delta };
      if (!Number.isInteger(input.delta) || next.available < 0) throw new Error("Invalid inventory adjustment");
      await deps.inventory.saveLevel(next); return next;
    },
  };
}
