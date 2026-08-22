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
      id: crypto.randomUUID(), tenantId: product.tenantId,
      idempotencyKey: `product.created:${product.id}`,
      occurredAt: product.createdAt,
      event: { type: "product.created", tenantId: product.tenantId, aggregateId: product.id,
        occurredAt: product.createdAt, payload: { storeId: product.storeId, title: product.title, handle: product.handle, status: product.status } },
    });
    return product;
  }

  async createOrder(command: CreateOrderCommand) {
    const order = buildOrder(command);
    await this.repository.saveOrder(order);
    await this.events.publish({
      id: crypto.randomUUID(), tenantId: order.tenantId,
      idempotencyKey: `order.created:${order.id}`,
      occurredAt: order.occurredAt,
      event: { type: "order.created", tenantId: order.tenantId, aggregateId: order.id,
        occurredAt: order.occurredAt, payload: { storeId: order.storeId, totalMinor: order.totalMinor, currency: order.currency } },
    });
    return order;
  }
}
