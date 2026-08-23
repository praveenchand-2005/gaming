# Commerce OS — Build Progress

> A merchant operating system designed to go beyond a traditional Shopify-style admin: commerce operations, intelligence, automation, and permission-scoped AI employees in one control plane.

## Current status

**Foundation:** built through the AI Employee execution boundary.

**Important:** this branch contains the architecture and implementation slices built so far. Some runtime wiring, database migrations, production authentication, and real external integrations remain before production deployment.

## What we have built, step by step

### 1. Domain + application foundation
- Product and order domain contracts
- Product validation
- Order total calculation
- Application services
- Repository abstractions
- Domain event publishing
- Deterministic in-memory repository for development/tests

### 2. API foundation
- Node HTTP server
- `/health`
- JSON request parsing
- Dependency-composed API bootstrap
- Product/order route dispatch

### 3. Merchant Admin
- Dark merchant control-plane shell
- AI Command Center navigation
- Products, Orders, Inventory and AI Employees views
- API client and resource-state abstractions

### 4. Catalog
- Products
- Product variants
- SKU validation
- Variant pricing/currency
- Product search/list contracts
- PostgreSQL product repository
- PostgreSQL variant repository

### 5. Inventory
- Available and reserved quantities
- Stock adjustment invariant
- Reservation invariant
- Location-aware inventory
- PostgreSQL inventory repository
- Inventory API adjustment endpoint

### 6. Multi-tenancy + RBAC
- Tenant context
- User context
- Owner/Admin/Manager/Staff/Viewer roles
- Permission constants
- Tenant mismatch protection
- Permission-gated API operations

### 7. Customers + Orders + Fulfillment
- Customer validation and persistence boundary
- Customer API contract
- Order lifecycle rules
- Fulfillment state machine

### 8. AI Commerce Intelligence
Signals supported by the current deterministic insight layer:
- Low stock
- Abandoned carts
- Conversion changes
- Revenue changes

Pipeline:

`Commerce event → signal → explainable insight → tenant insight store → Command Center API`

Every insight has a severity, explanation, recommended action, and source signal.

### 9. Approval-first Automation
Automation actions currently modeled:
- Reorder inventory
- Launch cart recovery
- Adjust price

Safety pipeline:

`AI insight → proposed action → merchant approval → execution → audit`

Actions are not allowed to execute while approval is pending.

### 10. AI Employees
Current agent definitions:
- Sales Agent
- Inventory Agent
- Marketing Agent
- Finance Agent
- Support Agent

Each agent has explicit tools and required permissions.

Agent execution boundary:

`Agent → tool lookup → tenant check → permission check → handler → execution`

An execution gateway additionally requires the action to have been approved.

## How the system works

```text
                         ┌──────────────────────────┐
                         │       Merchant Admin      │
                         │  Products / Orders / AI   │
                         └────────────┬─────────────┘
                                      │
                                      ▼
                         ┌──────────────────────────┐
                         │       API / Auth          │
                         │ Tenant + RBAC + Routes   │
                         └────────────┬─────────────┘
                                      │
                 ┌────────────────────┴────────────────────┐
                 ▼                                         ▼
       ┌────────────────────┐                    ┌────────────────────┐
       │ Application Layer  │                    │  AI Intelligence   │
       │ Products / Orders  │                    │ Signals / Insights │
       │ Inventory / Users  │                    └─────────┬──────────┘
       └─────────┬──────────┘                              │
                 ▼                                         ▼
       ┌────────────────────┐                    ┌────────────────────┐
       │ Domain Invariants  │                    │ Approval-first     │
       │ Product / Order    │                    │ Automation         │
       │ Inventory / Fulfill│                    └─────────┬──────────┘
       └─────────┬──────────┘                              │
                 ▼                                         ▼
       ┌────────────────────┐                    ┌────────────────────┐
       │ Repositories       │                    │ AI Employees       │
       │ PostgreSQL / Dev   │                    │ Tools + Permissions│
       └─────────┬──────────┘                    └─────────┬──────────┘
                 │                                         │
                 └────────────────┬────────────────────────┘
                                  ▼
                         ┌──────────────────────┐
                         │ Events + Audit Trail │
                         └──────────────────────┘
```

## Why this is different

The product direction is not simply “Shopify with a different UI.” The central loop is:

**Observe → Understand → Recommend → Approve → Execute → Measure**

The Admin is the control plane, while AI intelligence and automation sit on top of the same commerce primitives.

## Current visual direction

The Admin UI uses a dense, dark, operator-oriented workspace:

```text
┌───────────────┬──────────────────────────────────────────────────┐
│ Commerce OS   │ AI COMMAND CENTER                  Ask Commerce OS│
│               │                                                  │
│ AI Command    │ BUSINESS HEALTH                                 │
│ Overview      │ 82/100   Store healthy · 3 actions              │
│ Orders        │                                                  │
│ Products      ├──────────┬──────────┬──────────┬──────────┐     │
│ Inventory     │ Revenue  │ Orders   │ Convert. │ Profit   │     │
│ Customers     │ ₹4.82L   │ 1,284    │ 3.84%    │ ₹1.31L   │     │
│ Marketing     └──────────┴──────────┴──────────┴──────────┘     │
│ Analytics     │                                                  │
│ Automations   │ NEEDS ATTENTION             AI EMPLOYEES        │
│ AI Employees  │ Stockout risk              Sales Agent          │
│ Settings      │ Conversion drop            Inventory Agent      │
│               │ Cart recovery              Marketing Agent      │
└───────────────┴──────────────────────────────────────────────────┘
```

The next visual evolution will replace remaining demo metrics with live API data and add action approval cards directly into the Command Center.

## What is NOT finished yet

- Production-grade authentication/session management
- Database migrations/schema deployment
- Complete API server route composition
- Full CRUD/read API coverage
- Admin routing integration across every navigation item
- Live PostgreSQL environment
- Real payment gateways
- Shipping/tax integrations
- Marketplace/sales-channel integrations
- Production LLM provider integration
- Real tool handlers for AI Employees
- Action execution + persistent audit repository
- Observability, rate limits, background jobs, queues
- End-to-end and deployment CI coverage

These are deliberately tracked as remaining work instead of being represented as completed features.

## Roadmap

1. Complete PostgreSQL schema + migrations
2. Finish API composition and integration tests
3. Replace Admin demo data with live API data
4. Complete Orders/Customers/Fulfillment workflows
5. Build action approval UI + persistent audit log
6. Implement Inventory Agent tools
7. Implement Sales Agent tools
8. Analytics + forecasting
9. Marketing automation
10. Payments, shipping, tax and sales channels
11. Production authentication and deployment
12. Full end-to-end test suite
