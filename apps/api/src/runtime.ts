import { createPostgresPool } from "@commerce-os/db/postgres.js";
import { PostgresActionRepository } from "@commerce-os/automation/postgres-action-repository.js";
import { PostgresActionAuditStore } from "@commerce-os/automation/postgres-audit-store.js";
import { AuditedActionService } from "@commerce-os/automation/audited-action-service.js";
import { AgentExecutionGateway } from "@commerce-os/agents/execution-gateway.js";
import { AgentToolRunner } from "@commerce-os/agents/tool-runner.js";
import { createToolRegistry } from "@commerce-os/agents/tool-registry.js";
import { createActionEndpoints } from "./action-endpoints.js";

export function createAutomationRuntime() {
  const pool = createPostgresPool();
  const actions = new PostgresActionRepository(pool);
  const audits = new PostgresActionAuditStore(pool);
  const runner = new AgentToolRunner(createToolRegistry());
  const gateway = new AgentExecutionGateway(runner);
  const service = new AuditedActionService(actions, gateway, audits);
  return { pool, actions, audits, runner, gateway, service, endpoints: createActionEndpoints(service) };
}
