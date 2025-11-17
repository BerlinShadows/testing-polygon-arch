
import { ScenarioRepositoryPort } from 'src/core/domain/V2/scenario/ports/scenario.repository.port';
import { ScenarioGuard } from './scenario-guard';

export function createScenarioGuard(baseRepo: ScenarioRepositoryPort): ScenarioRepositoryPort {
    return new ScenarioGuard(baseRepo, 'scenario');
}