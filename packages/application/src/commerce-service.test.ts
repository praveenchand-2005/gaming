import { describe, expect, it } from "vitest";
import { CommerceService } from "./commerce-service.js";
import { InMemoryCommerceRepository } from "@commerce-os/db/in-memory-repository.js";
import { InMemoryEventBus } from "@commerce-os/events";

describe("CommerceService", () => {
  it("persists a product and publishes its event", async () => {
    const repository = new InMemoryCommerceRepository();
    const events = new InMemoryEventBus();
    const published: string[] = [];
    events.subscribe({ eventType: "product.created", async () => { published.push("product.created"); } });
    const service = new CommerceService(repository, events);

    const product = await service.createProduct({
      tenantId: "tenant-1", storeId: "store-1", title: "Demo Product", handle: "demo-product",
    });

    expect(repository.products.get(product.id)?.title).toBe("Demo Product");
    expect(published).toEqual(["product.created"]);
  });

  it("persists an order with calculated totals and publishes its event", async () => {
    const repository = new InMemoryCommerceRepository();
    const events = new InMemoryEventBus();
    const published: string[] = [];
    events.subscribe({ eventType: "order.created", async () => { published.push("order.created"); } });
    const service = new CommerceService(repository, events);

    const order = await service.createOrder({
      tenantId: "tenant-1", storeId: "store-1", currency: "usd",
      items: [{ variantId: "v1", quantity: 2, unitPriceMinor: 1250 }],
    });

    expect(order.totalMinor).toBe(2500);
    expect(repository.orders.has(order.id)).toBe(true);
    expect(published).toEqual(["order.created"]);
  });
});
