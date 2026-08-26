import type { ID, Store } from "./index.js";

export interface CreateTenantCommand { name: string; slug: string; }
export interface CreateStoreCommand { tenantId: ID; name: string; slug: string; currency?: string; timezone?: string; }

export function createTenantId(): ID { return crypto.randomUUID(); }
export function createStoreId(): ID { return crypto.randomUUID(); }

export function buildStore(command: CreateStoreCommand, now = new Date().toISOString()): Store {
  return {
    id: createStoreId(), tenantId: command.tenantId, name: command.name, slug: command.slug,
    currency: command.currency ?? "USD", timezone: command.timezone ?? "UTC", status: "active",
    createdAt: now, updatedAt: now,
  };
}
