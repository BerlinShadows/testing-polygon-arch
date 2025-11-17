import { AbstractScenarioRepositoryPort } from "src/core/domain/V2/scenario/ports/abstract-scenario-repository.port";

export class PauseScenarioUseCase {
    constructor(private readonly repo: AbstractScenarioRepositoryPort) { }

    async execute(instanceId: string): Promise<void> {
        await this.repo.pauseInstance(instanceId);
    }
}