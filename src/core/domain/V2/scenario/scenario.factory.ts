import { ScenarioParameter, ScenarioStep, ScenarioTemplate, ValidationResult, StepResult } from "./scenario.entity";

export class ScenarioTemplateFactory {
    static create(input: {
        id: string;
        name: string;
        description?: string;
        version?: number;
        parameters: ScenarioParameter[];
        steps: Array<Omit<ScenarioStep, 'id'> & { id?: string }>;
    }): ScenarioTemplate {
        const version = input.version ?? 1;
        const steps = input.steps.map(step => ({
            ...step,
            id: step.id || crypto.randomUUID(),
        }));

        validateSteps(steps);

        return {
            id: input.id,
            name: input.name,
            description: input.description,
            version,
            parameters: input.parameters,
            steps,

            validateParameters(inputParams: Record<string, unknown>): ValidationResult {
                const errors: string[] = [];
                for (const param of this.parameters) {
                    const value = inputParams[param.name];
                    if (param.required && (value === undefined || value === null)) {
                        errors.push(`Missing required parameter: ${param.name}`);
                    }
                }
                return errors.length === 0 ? { valid: true } : { valid: false, errors };
            },

            getNextStep(currentStepId: string, result: StepResult): string | null {
                const step = this.steps.find(s => s.id === currentStepId);
                if (!step) return null;

                if (result === 'success') {
                    return step.onSuccessGoTo || null;
                } else {
                    return step.onFailureGoTo || null;
                }
            }
        };
    }
}

function validateSteps(steps: ScenarioStep[]): void {
    const ids = steps.map(s => s.id);
    if (new Set(ids).size !== ids.length) {
        throw new Error('Step IDs must be unique');
    }
    const stepIds = new Set(ids);
    for (const step of steps) {
        if (step.onSuccessGoTo && !stepIds.has(step.onSuccessGoTo)) {
            throw new Error(`Invalid onSuccessGoTo: ${step.onSuccessGoTo}`);
        }
        if (step.onFailureGoTo && !stepIds.has(step.onFailureGoTo)) {
            throw new Error(`Invalid onFailureGoTo: ${step.onFailureGoTo}`);
        }
    }
}