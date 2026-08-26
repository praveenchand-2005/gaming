export interface EventEnvelope<T extends { type: string }> {
  id: string;
  tenantId: string;
  idempotencyKey: string;
  occurredAt: string;
  event: T;
}

export interface EventHandler<T extends { type: string }> {
  readonly eventType: T["type"];
  handle(envelope: EventEnvelope<T>): Promise<void>;
}

export interface EventBus {
  publish<T extends { type: string }>(envelope: EventEnvelope<T>): Promise<void>;
  subscribe<T extends { type: string }>(handler: EventHandler<T>): void;
}

export class InMemoryEventBus implements EventBus {
  private readonly handlers = new Map<string, EventHandler<any>[]>();

  subscribe<T extends { type: string }>(handler: EventHandler<T>): void {
    const existing = this.handlers.get(handler.eventType) ?? [];
    existing.push(handler);
    this.handlers.set(handler.eventType, existing);
  }

  async publish<T extends { type: string }>(envelope: EventEnvelope<T>): Promise<void> {
    const handlers = this.handlers.get(envelope.event.type) ?? [];
    for (const handler of handlers) {
      await handler.handle(envelope);
    }
  }
}
