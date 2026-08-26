import { CommerceInsightHandler } from "./event-insight-handler.js";
import { signalFromEvent, type CommerceEvent } from "./event-to-signal.js";

export class CommerceEventConsumer {
  constructor(private readonly handler: CommerceInsightHandler) {}

  consume(tenantId: string, event: CommerceEvent): void {
    const signal = signalFromEvent(event);
    if (signal) this.handler.handle(tenantId, signal);
  }
}
