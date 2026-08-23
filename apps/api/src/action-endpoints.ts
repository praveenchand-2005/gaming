import { authenticate, requirePermission } from "./auth-middleware.js";
import { permissions } from "@commerce-os/auth/permissions.js";
import type { ApprovedActionService } from "@commerce-os/automation/approved-action-service.js";

export function createActionEndpoints(service: ApprovedActionService) {
  return {
    async approveAndExecute(headers: Record<string,string|undefined>, actionId: string, agentId: "sales"|"inventory"|"marketing"|"finance"|"support") {
      const context = authenticate(headers);
      requirePermission(context, permissions.aiExecute);
      return service.approveAndExecute(context, actionId, agentId);
    },
  };
}
