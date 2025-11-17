import { Action, checkPermission } from "src/core/domain/V2/access/access-policy";

export class SecureGuard<TPort> {
    constructor(
        private readonly port: TPort,
        private readonly resourceType: string
    ) { }

    createProtectedMethod<K extends keyof TPort>(
        action: Action,
        method: K,
        resourceIdExtractor?: (...args: any[]) => string | null
    ): TPort[K] {
        const original = this.port[method];
        if (typeof original !== 'function') {
            throw new Error(`Method ${String(method)} is not a function`);
        }

        return ((...args: any[]) => {
            const resourceId = resourceIdExtractor
                ? resourceIdExtractor(...args)
                : 'global';

            if (!checkPermission(this.resourceType, resourceId, action)) {
                throw new Error(`ACCESS_DENIED: ${action} on ${this.resourceType}`);
            }

            return (original as Function).apply(this.port, args);
        }) as TPort[K];
    }
}