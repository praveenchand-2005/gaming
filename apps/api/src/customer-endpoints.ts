import { permissions } from "@commerce-os/auth/permissions.js";
import { authenticate, requirePermission } from "./auth-middleware.js";
import { requireBody } from "./http.js";
import { buildCustomer } from "@commerce-os/domain/customer.js";

export function createCustomerEndpoints(repository: { save(customer: any): Promise<void>; list(tenantId: string, limit?: number): Promise<any[]> }) {
  return {
    async list(headers: Record<string,string|undefined>) {
      const context = authenticate(headers); requirePermission(context, permissions.customersRead);
      return repository.list(context.tenantId);
    },
    async create(headers: Record<string,string|undefined>, body: unknown) {
      const context = authenticate(headers); requirePermission(context, permissions.customersRead);
      const input = requireBody<{ storeId:string; email:string; firstName?:string; lastName?:string }>(body);
      const customer = buildCustomer({ tenantId: context.tenantId, ...input });
      await repository.save(customer); return customer;
    },
  };
}
