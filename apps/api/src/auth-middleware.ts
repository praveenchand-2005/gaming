import type { IncomingHttpHeaders } from "node:http";
import { rolePermissions } from "@commerce-os/auth/permissions.js";
import type { TenantContext } from "@commerce-os/auth/tenant-context.js";

export function authenticate(headers: IncomingHttpHeaders): TenantContext {
  const tenantId = String(headers["x-tenant-id"] ?? "").trim();
  const userId = String(headers["x-user-id"] ?? "").trim();
  const role = String(headers["x-user-role"] ?? "viewer") as keyof typeof rolePermissions;
  if (!tenantId || !userId || !rolePermissions[role]) throw new Error("Unauthorized");
  return { tenantId, userId, role, permissions: rolePermissions[role] };
}

export function requirePermission(context: TenantContext, permission: string): void {
  if (!context.permissions.includes("*") && !context.permissions.includes(permission)) throw new Error("Forbidden");
}
