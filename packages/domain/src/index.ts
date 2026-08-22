export type ID = string;

export interface TenantOwned {
  id: ID;
  tenantId: ID;
  createdAt: string;
  updatedAt: string;
}

export interface Store extends TenantOwned {
  name: string;
  slug: string;
  currency: string;
  timezone: string;
  status: "active" | "suspended";
}

export interface Product extends TenantOwned {
  storeId: ID;
  title: string;
  handle: string;
  description?: string;
  status: "draft" | "active" | "archived";
}

export interface ProductVariant extends TenantOwned {
  productId: ID;
  sku: string;
  title: string;
  priceMinor: number;
  currency: string;
  inventoryTracked: boolean;
}

export interface Customer extends TenantOwned {
  storeId: ID;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface Order extends TenantOwned {
  storeId: ID;
  customerId?: ID;
  orderNumber: string;
  status: "pending" | "paid" | "fulfilled" | "cancelled" | "refunded";
  currency: string;
  totalMinor: number;
}

export interface DomainEvent<TPayload = unknown> {
  id: ID;
  tenantId: ID;
  aggregateType: string;
  aggregateId: ID;
  type: string;
  version: number;
  occurredAt: string;
  payload: TPayload;
}
