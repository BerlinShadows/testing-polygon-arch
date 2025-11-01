import { AuditEventType, AuditProvider } from "./audit-event.types";

export class AuditEvent {
    constructor(
        public readonly providerId: AuditProvider,
        public readonly eventType: AuditEventType,
        public readonly payload: Record<string, any>,
        public readonly timestamp: Date = new Date(),
    ) { }
}