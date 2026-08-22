import type { CreateProductCommand } from "./commerce.js";

export interface BuiltProduct {
  id: string;
  tenantId: string;
  storeId: string;
  title: string;
  handle: string;
  description: string;
  status: "draft";
  createdAt: string;
  updatedAt: string;
}

export function buildProduct(command: CreateProductCommand, now = new Date().toISOString()): BuiltProduct {
  const title = command.title.trim();
  const handle = command.handle.trim().toLowerCase();
  if (!title) throw new Error("Product title is required");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(handle)) throw new Error("Handle must be URL-safe");
  return { id: crypto.randomUUID(), tenantId: command.tenantId, storeId: command.storeId, title,
    handle, description: command.description?.trim() ?? "", status: "draft", createdAt: now, updatedAt: now };
}
