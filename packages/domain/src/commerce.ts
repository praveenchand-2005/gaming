export type TenantId = string;
export type StoreId = string;
export type ProductId = string;
export type VariantId = string;
export type CustomerId = string;
export type OrderId = string;

export type ProductStatus = "draft" | "active" | "archived";
export type OrderStatus = "pending" | "paid" | "fulfilled" | "cancelled" | "refunded";

export interface Product {
  id: ProductId;
  tenantId: TenantId;
  storeId: StoreId;
  title: string;
  handle: string;
  description: string;
  status: ProductStatus;
}

export interface ProductVariant {
  id: VariantId;
  tenantId: TenantId;
  productId: ProductId;
  sku: string;
  title: string;
  priceMinor: number;
  costMinor?: number;
  currency: string;
}

export interface CreateProductCommand {
  tenantId: TenantId;
  storeId: StoreId;
  title: string;
  handle: string;
  description?: string;
}

export interface CreateOrderCommand {
  tenantId: TenantId;
  storeId: StoreId;
  customerId?: CustomerId;
  currency: string;
  items: Array<{
    variantId: VariantId;
    quantity: number;
    unitPriceMinor: number;
  }>;
}

export interface ProductCreatedEvent {
  type: "product.created";
  tenantId: TenantId;
  aggregateId: ProductId;
  occurredAt: string;
  payload: Pick<Product, "storeId" | "title" | "handle" | "status">;
}

export interface OrderCreatedEvent {
  type: "order.created";
  tenantId: TenantId;
  aggregateId: OrderId;
  occurredAt: string;
  payload: { storeId: StoreId; totalMinor: number; currency: string };
}

export type CommerceEvent = ProductCreatedEvent | OrderCreatedEvent;
