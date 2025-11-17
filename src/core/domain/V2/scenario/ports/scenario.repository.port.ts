import { ScenarioTemplate, ScenarioInstance, ValidationResult, StepResult } from "../scenario.entity";

export interface ScenarioRepositoryPort {
    saveTemplate(template: ScenarioTemplate): Promise<void>;
    findTemplateById(id: string): Promise<ScenarioTemplate | null>;
    saveInstance(instance: ScenarioInstance): Promise<void>;
    findInstanceById(id: string): Promise<ScenarioInstance | null>;

    validateTemplateParameters(
        templateId: string,
        input: Record<string, unknown>
    ): Promise<ValidationResult>;

    updateInstanceStepResult(
        instanceId: string,
        stepId: string,
        result: StepResult,
        output?: unknown
    ): Promise<void>;

    pauseInstance(instanceId: string): Promise<void>;
    resumeInstance(instanceId: string): Promise<void>;
}