import type { DomainEvent } from "@commerce-os/domain";

export type EventHandler<T = unknown> = (event: DomainEvent<T>) => Promise<void>;

export class InMemoryEventBus {
  private readonly handlers = new Map<string, EventHandler[]>();

  on<T>(eventType: string, handler: EventHandler<T>): void {
    const current = this.handlers.get(eventType) ?? [];
    current.push(handler as EventHandler);
    this.handlers.set(eventType, current);
  }

  async publish<T>(event: DomainEvent<T>): Promise<void> {
    for (const handler of this.handlers.get(event.type) ?? []) {
      await handler(event);
    }
  }
}
