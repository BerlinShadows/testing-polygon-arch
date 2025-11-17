import { AbstractScenarioRepositoryPort } from "src/core/domain/V2/scenario/ports/abstract-scenario-repository.port";

export class ListScenariosByOwnerUseCase {
    constructor(private readonly repo: AbstractScenarioRepositoryPort) { }

    async execute(ownerId: string): Promise<ScenarioSummary[]> {
        const instances = await this.repo.findInstanceById('dummy'); // ← временно
        return [];
    }
}

export interface ScenarioSummary {
    id: string;
    templateId: string;
    status: string;
    startedAt: Date;
}