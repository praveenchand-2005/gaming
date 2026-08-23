export interface TenantContext {
  tenantId: string;
  userId: string;
  role: string;
  permissions: readonly string[];
}
