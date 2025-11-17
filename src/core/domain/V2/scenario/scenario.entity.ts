export interface ScenarioCondition {
    type: 'timeout' | 'event' | 'predicate';
    value: unknown;
}

export interface ScenarioStep {
    id: string;
    name: string;
    actionType: string;
    payload: unknown;
    conditions?: ScenarioCondition[];
    onSuccessGoTo?: string;
    onFailureGoTo?: string;
    maxRetries?: number;
    timeoutMs?: number;
}

export interface ScenarioParameter {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'json';
    required: boolean;
    defaultValue?: unknown;
}

export interface ScenarioTemplate {
    id: string;
    name: string;
    description?: string;
    version: number;
    parameters: ScenarioParameter[];
    steps: ScenarioStep[];
    validateParameters(input: Record<string, unknown>): ValidationResult;
    getNextStep(currentStepId: string, result: StepResult): string | null;
}

export type ValidationResult = { valid: true } | { valid: false; errors: string[] };
export type StepResult = 'success' | 'failure' | 'timeout';

export interface ScenarioInstance {
    id: string;
    templateId: string;
    templateVersion: number;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'paused';
    inputParameters: Record<string, unknown>;
    currentStepId: string | null;
    stepResults: Record<string, StepExecution>;
    startedAt: Date;
    completedAt?: Date;
    pausedAt?: Date;
}

export interface StepExecution {
    stepId: string;
    attempt: number;
    startedAt: Date;
    completedAt?: Date;
    result?: StepResult;
    output?: unknown;
    error?: string;
}