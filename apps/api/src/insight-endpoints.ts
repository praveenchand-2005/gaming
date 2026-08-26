import { permissions } from "@commerce-os/auth/permissions.js";
import { authenticate, requirePermission } from "./auth-middleware.js";
import { InsightStore } from "@commerce-os/ai/insight-store.js";

export function createInsightEndpoints(store: InsightStore) {
  return {
    list(headers: Record<string, string | undefined>) {
      const context = authenticate(headers);
      requirePermission(context, permissions.analyticsRead);
      return store.list(context.tenantId);
    },
  };
}
