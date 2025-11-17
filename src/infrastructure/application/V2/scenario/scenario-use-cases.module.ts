import { Module } from '@nestjs/common';

import { CreateScenarioTemplateUseCase } from 'src/core/application/V2/scenario/use-cases/create-scenario-template.use-case';
import { GetScenarioStatusUseCase } from 'src/core/application/V2/scenario/use-cases/get-scenario-status.use-case';
import { ListScenariosByOwnerUseCase } from 'src/core/application/V2/scenario/use-cases/list-scenarios-by-owner.use-case';
import { PauseScenarioUseCase } from 'src/core/application/V2/scenario/use-cases/pause-scenario.use-case';
import { StartScenarioUseCase } from 'src/core/application/V2/scenario/use-cases/start-scenario.use-case';
import { AbstractScenarioRepositoryPort } from 'src/core/domain/V2/scenario/ports/abstract-scenario-repository.port';
import { ScenarioRepositoryPort } from 'src/core/domain/V2/scenario/ports/scenario.repository.port';
import { DatabaseModule } from 'src/infrastructure/persistence/database/database.module';


@Module({
    imports: [DatabaseModule],
    providers: [
        {
            provide: CreateScenarioTemplateUseCase,
            useFactory: (
                scenarioRepo: ScenarioRepositoryPort
            ) => new CreateScenarioTemplateUseCase(
                scenarioRepo
            ),
            inject: [AbstractScenarioRepositoryPort],
        },
        {
            provide: GetScenarioStatusUseCase,
            useFactory: (
                scenarioRepo: ScenarioRepositoryPort
            ) => new GetScenarioStatusUseCase(
                scenarioRepo
            ),
            inject: [AbstractScenarioRepositoryPort],
        },
        {
            provide: ListScenariosByOwnerUseCase,
            useFactory: (
                scenarioRepo: ScenarioRepositoryPort
            ) => new ListScenariosByOwnerUseCase(
                scenarioRepo
            ),
            inject: [AbstractScenarioRepositoryPort],
        },
        {
            provide: StartScenarioUseCase,
            useFactory: (
                scenarioRepo: ScenarioRepositoryPort
            ) => new StartScenarioUseCase(
                scenarioRepo
            ),
            inject: [AbstractScenarioRepositoryPort],
        },
        {
            provide: PauseScenarioUseCase,
            useFactory: (
                scenarioRepo: ScenarioRepositoryPort
            ) => new StartScenarioUseCase(
                scenarioRepo
            ),
            inject: [AbstractScenarioRepositoryPort],
        },
    ],
    exports: [
        CreateScenarioTemplateUseCase,
        GetScenarioStatusUseCase,
        ListScenariosByOwnerUseCase,
        StartScenarioUseCase,
        PauseScenarioUseCase,
    ]
})
export class ScenarioUseCasesModule { } // 07090b36-d33e-4b9e-9046-a77dfeeb49e3