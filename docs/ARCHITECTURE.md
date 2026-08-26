# Commerce OS — Architecture Foundation

## Target shape

```text
apps/
  admin-web/        Merchant admin and AI command center
  storefront/       Customer storefront
  api/              Public/private API edge
  worker/           Background jobs and event consumers

packages/
  domain/            Domain types and business rules
  db/                Persistence and migrations
  auth/              Identity, sessions and RBAC
  events/            Event contracts and dispatcher
  workflows/        Durable workflow definitions
  ai/                Agent runtime, tools, policies and memory interfaces
  ui/                Shared design system
  config/            Shared configuration and validation
```

## Architectural rules

### Domain
Business rules belong in domain/application services, not React components or route handlers.

### Persistence
Every tenant-owned record must have an explicit tenant boundary. Queries must never depend on an implicit global tenant.

### Events
Commands change state; events describe facts after successful state changes. Event handlers must be retry-safe.

### AI
AI agents never receive unrestricted database access. They operate through typed tools that enforce tenant scope, permissions, validation and approval policies.

### API
Use stable resource-oriented endpoints and version public contracts. Internal service contracts should be typed and tested.

### Async work
Email, analytics aggregation, AI analysis, inventory forecasting, imports/exports and external synchronization belong in jobs/workflows rather than synchronous HTTP requests.

## Security boundary

```text
User/Agent
   |
   v
Auth + Tenant Context
   |
   v
Authorization Policy
   |
   v
Application Command
   |
   +--> Approval Policy
   |
   v
Domain Service
   |
   +--> Database transaction
   |
   +--> Domain event
             |
             v
       Event/Workflow bus
```

## Initial persistence domains

- tenants
- users
- memberships
- roles/permissions
- stores
- products
- product_variants
- inventory_locations
- inventory_levels
- inventory_movements
- customers
- carts
- orders
- order_items
- payments
- fulfillments
- returns
- refunds
- domain_events
- audit_logs
- workflow_runs
- agent_runs
- approvals

## Technology principle

Choose boring, mature infrastructure for the commerce core and reserve model-specific dependencies for the AI layer. The architecture must remain useful if the AI provider changes.
