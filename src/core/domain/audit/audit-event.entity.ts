export class AuditEvent {
    constructor(
        public readonly id: string,
        public readonly providerId: string,
        public readonly eventType: string,
        public readonly payload: Record<string, any>,
        public readonly timestamp: Date = new Date(),
    ) { }
}