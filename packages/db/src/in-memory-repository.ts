import type { CommerceRepository } from "./repository.js";
import type { BuiltOrder } from "@commerce-os/domain/order.js";
import type { BuiltProduct } from "@commerce-os/domain/product.js";

export class InMemoryCommerceRepository implements CommerceRepository {
  readonly products = new Map<string, BuiltProduct>();
  readonly orders = new Map<string, BuiltOrder>();

  async saveProduct(product: BuiltProduct): Promise<void> {
    if (this.products.has(product.id)) throw new Error("Product already exists");
    this.products.set(product.id, product);
  }

  async saveOrder(order: BuiltOrder): Promise<void> {
    if (this.orders.has(order.id)) throw new Error("Order already exists");
    this.orders.set(order.id, order);
  }
}
