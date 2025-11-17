export interface AccessContext {
    userId: string;
    roles: string[];
}

let currentContext: AccessContext | null = null;

export const AccessContextManager = {
    set(ctx: AccessContext): void {
        currentContext = ctx;
    },
    get(): AccessContext {
        if (!currentContext) throw new Error('ACCESS_CONTEXT_NOT_SET');
        return currentContext;
    },
    clear(): void {
        currentContext = null;
    }
};