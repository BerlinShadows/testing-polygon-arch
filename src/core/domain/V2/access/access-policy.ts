import { AccessContextManager } from './access-context';

export function checkPermission(
    resourceType: string,
    resourceId: string,
    action: string
): boolean {
    const ctx = AccessContextManager.get();

    if (ctx.roles.includes('admin')) return true;

    if (resourceType === 'scenario' && action === 'execute') {
        return ctx.roles.includes('executor');
    }

    if (resourceType === 'role' && action === 'write') {
        return ctx.roles.includes('admin');
    }

    if (action === 'read') {
        return true;
    }

    return false;
}