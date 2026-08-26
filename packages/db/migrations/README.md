# Database migrations

Apply migrations in lexical order after the base `packages/db/schema.sql`:

1. `002_automation.sql`

The automation migration creates persistent proposed-action records and the action audit trail used by the approval/execution pipeline.

Production deployment should run migrations through a dedicated migration runner before starting API workers.
