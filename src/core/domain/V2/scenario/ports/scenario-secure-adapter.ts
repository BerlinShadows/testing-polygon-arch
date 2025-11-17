import { SecureGuard } from "src/core/application/V2/access/secure-guard";
import { ScenarioRepositoryPort } from "./scenario.repository.port";

export function createSecureScenarioRepository(
    baseRepo: ScenarioRepositoryPort
): ScenarioRepositoryPort {
    const guard = new SecureGuard(baseRepo, 'scenario');

    return {
        saveTemplate: guard.createProtectedMethod('write', 'saveTemplate', t => t.id),
        findTemplateById: guard.createProtectedMethod('read', 'findTemplateById', id => id),
        saveInstance: guard.createProtectedMethod('execute', 'saveInstance', i => i.id),
        findInstanceById: guard.createProtectedMethod('read', 'findInstanceById', id => id),
        validateTemplateParameters: guard.createProtectedMethod('read', 'validateTemplateParameters', ([id]) => id),
        updateInstanceStepResult: guard.createProtectedMethod('execute', 'updateInstanceStepResult', ([id]) => id),
        pauseInstance: guard.createProtectedMethod('write', 'pauseInstance', id => id),
        resumeInstance: guard.createProtectedMethod('write', 'resumeInstance', id => id),
    };
}