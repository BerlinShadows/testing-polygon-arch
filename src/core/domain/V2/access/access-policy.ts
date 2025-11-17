import { AccessContextManager } from "./access-context";

export type ResourceType = 'scenario' | 'user' | 'document' | string;
export type Action = 'read' | 'write' | 'execute' | 'delete' | string;

export function checkPermission(
    resourceType: ResourceType,
    resourceId: string | null,
    action: Action
): boolean {
    const ctx = AccessContextManager.get();

    if (ctx.roles.includes('admin')) return true;

    if (resourceType === 'scenario' && action === 'execute') {
        return ctx.roles.includes('executor');
    }

    if (resourceType === 'scenario' && action === 'read') {
        return ctx.roles.includes('user') || ctx.roles.includes('executor');
    }

    return false;
}