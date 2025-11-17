import { AccessContextManager } from "src/core/domain/V2/access/access-context";
import { checkPermission } from "src/core/domain/V2/access/access-policy";


export abstract class DomainGuard<T> {
    protected readonly target: T;
    protected readonly resourceType: string;

    constructor(target: T, resourceType: string) {
        this.target = target;
        this.resourceType = resourceType;
    }

    protected extractResourceId(methodName: string, args: any[]): string | null {
        if (methodName.includes('ById') && args[0] && typeof args[0] === 'string') {
            return args[0];
        }
        if (methodName.startsWith('save') || methodName.startsWith('create')) {
            const entity = args[0];
            return entity?.id || null;
        }
        return 'global';
    }

    protected getActionFromMethodName(methodName: string): string {
        if (methodName.startsWith('find') || methodName.startsWith('get')) {
            return 'read';
        }
        if (methodName.startsWith('save') || methodName.startsWith('create') || methodName === 'update') {
            return 'write';
        }
        if (methodName.includes('delete')) {
            return 'delete';
        }
        if (methodName.includes('execute') || methodName.includes('run')) {
            return 'execute';
        }
        return 'use';
    }

    protected enforceAccess(resourceId: string | null, action: string): void {
        const ctx = AccessContextManager.get();
        if (!checkPermission(this.resourceType, resourceId || 'global', action)) {
            throw new Error(`ACCESS_DENIED: ${action} on ${this.resourceType}`);
        }
    }
}