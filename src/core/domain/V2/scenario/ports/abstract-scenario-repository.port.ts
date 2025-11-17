import { ScenarioTemplate, ScenarioInstance, ValidationResult, StepResult } from "../scenario.entity";
import { ScenarioRepositoryPort } from "./scenario.repository.port";

export abstract class AbstractScenarioRepositoryPort implements ScenarioRepositoryPort {
    abstract saveTemplate(template: ScenarioTemplate): Promise<void>;
    abstract findTemplateById(id: string): Promise<ScenarioTemplate | null>;
    abstract saveInstance(instance: ScenarioInstance): Promise<void>;
    abstract findInstanceById(id: string): Promise<ScenarioInstance | null>;

    abstract validateTemplateParameters(
        templateId: string,
        input: Record<string, unknown>
    ): Promise<ValidationResult>;

    abstract updateInstanceStepResult(
        instanceId: string,
        stepId: string,
        result: StepResult,
        output?: unknown
    ): Promise<void>;

    abstract pauseInstance(instanceId: string): Promise<void>;
    abstract resumeInstance(instanceId: string): Promise<void>;
}