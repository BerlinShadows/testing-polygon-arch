import { AbstractScenarioRepositoryPort } from "src/core/domain/V2/scenario/ports/abstract-scenario-repository.port";

export class GetScenarioStatusUseCase {
    constructor(private readonly repo: AbstractScenarioRepositoryPort) { }

    async execute(instanceId: string): Promise<ScenarioStatusResponse> {
        const instance = await this.repo.findInstanceById(instanceId);
        if (!instance) throw new Error('SCENARIO_INSTANCE_NOT_FOUND');

        return {
            id: instance.id,
            templateId: instance.templateId,
            status: instance.status,
            startedAt: instance.startedAt,
            completedAt: instance.completedAt,
            currentStepId: instance.currentStepId,
            stepResults: instance.stepResults,
        };
    }
}

export interface ScenarioStatusResponse {
    id: string;
    templateId: string;
    status: string;
    startedAt: Date;
    completedAt?: Date;
    currentStepId: string | null;
    stepResults: Record<string, any>;
}