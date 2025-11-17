import { AbstractScenarioRepositoryPort } from "src/core/domain/V2/scenario/ports/abstract-scenario-repository.port";

export class StartScenarioUseCase {
    constructor(private readonly repo: AbstractScenarioRepositoryPort) { }

    async execute(
        templateId: string,
        inputParameters: Record<string, unknown>
    ): Promise<string> {
        const template = await this.repo.findTemplateById(templateId);
        if (!template) throw new Error('TEMPLATE_NOT_FOUND');

        const validation = template.validateParameters(inputParameters);
        if (!validation.valid) {
            throw new Error(`Invalid parameters: ${validation.errors.join(', ')}`);
        }

        const instance = {
            id: crypto.randomUUID(),
            templateId: template.id,
            templateVersion: template.version,
            status: 'pending' as const,
            inputParameters: inputParameters || {},
            currentStepId: template.steps[0]?.id || null,
            stepResults: {},
            startedAt: new Date(),
        };

        await this.repo.saveInstance(instance);
        return instance.id;
    }
}