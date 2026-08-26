import type { CommerceRepository } from "@commerce-os/db/repository.js";
import type { BuiltOrder } from "@commerce-os/domain/order.js";
import type { BuiltProduct } from "@commerce-os/domain/product.js";

export class ApiCommerceRepository implements CommerceRepository {
  readonly products = new Map<string, BuiltProduct>();
  readonly orders = new Map<string, BuiltOrder>();

  async saveProduct(product: BuiltProduct): Promise<void> {
    if ([...this.products.values()].some(x => x.tenantId === product.tenantId && x.handle === product.handle)) throw new Error("Product handle already exists");
    this.products.set(product.id, product);
  }
  async saveOrder(order: BuiltOrder): Promise<void> { this.orders.set(order.id, order); }
}
