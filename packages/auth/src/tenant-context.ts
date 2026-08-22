export interface TenantContext {
  tenantId: string;
  userId: string;
  role: "owner" | "admin" | "manager" | "staff" | "viewer";
  permissions: readonly string[];
}

export function requireTenantContext(context: TenantContext): TenantContext {
  if (!context.tenantId.trim()) throw new Error("Tenant context is required");
  if (!context.userId.trim()) throw new Error("User context is required");
  return context;
}

export function can(context: TenantContext, permission: string): boolean {
  return context.permissions.includes("*") || context.permissions.includes(permission);
}
