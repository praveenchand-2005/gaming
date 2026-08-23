import { buildOrder, buildProduct, type CreateOrderCommand, type CreateProductCommand } from "@commerce-os/domain";
import type { EventBus } from "@commerce-os/events";

export interface CommerceRepository {
  saveProduct(product: ReturnType<typeof buildProduct>): Promise<void>;
  saveOrder(order: ReturnType<typeof buildOrder>): Promise<void>;
}

export class CommerceService {
  constructor(private readonly repository: CommerceRepository, private readonly events: EventBus) {}

  async createProduct(command: CreateProductCommand) {
    const product = buildProduct(command);
    await this.repository.saveProduct(product);
    await this.events.publish({
      id: crypto.randomUUID(),
      tenantId: product.tenantId,
      aggregateType: "product",
      aggregateId: product.id,
      type: "product.created",
      version: 1,
      occurredAt: product.createdAt,
      payload: { storeId: product.storeId, title: product.title, handle: product.handle, status: product.status },
    });
    return product;
  }

  async createOrder(command: CreateOrderCommand) {
    const order = buildOrder(command);
    await this.repository.saveOrder(order);
    await this.events.publish({
      id: crypto.randomUUID(),
      tenantId: order.tenantId,
      aggregateType: "order",
      aggregateId: order.id,
      type: "order.created",
      version: 1,
      occurredAt: order.occurredAt,
      payload: { storeId: order.storeId, totalMinor: order.totalMinor, currency: order.currency },
    });
    return order;
  }
}
