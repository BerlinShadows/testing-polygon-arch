import { AbstractScenarioRepositoryPort } from "src/core/domain/V2/scenario/ports/abstract-scenario-repository.port";
import { ScenarioTemplateFactory } from "src/core/domain/V2/scenario/scenario.factory";

export class CreateScenarioTemplateUseCase {
    constructor(private readonly repo: AbstractScenarioRepositoryPort) { }

    async execute(input: CreateScenarioTemplateDto): Promise<string> {
        const template = ScenarioTemplateFactory.create({
            id: input.id || crypto.randomUUID(),
            name: input.name,
            description: input.description,
            version: input.version,
            parameters: input.parameters,
            steps: input.steps,
        });

        await this.repo.saveTemplate(template);
        return template.id;
    }
}

export interface CreateScenarioTemplateDto {
    id?: string;
    name: string;
    description?: string;
    version?: number;
    parameters: Array<{
        name: string;
        type: 'string' | 'number' | 'boolean' | 'json';
        required: boolean;
        defaultValue?: any;
    }>;
    steps: Array<{
        id?: string;
        name: string;
        actionType: string;
        payload: unknown;
        delayMs?: number;
        timeoutMs?: number;
        onSuccessGoTo?: string;
        onFailureGoTo?: string;
        maxRetries?: number;
    }>;
}