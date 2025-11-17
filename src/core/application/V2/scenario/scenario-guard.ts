import { ScenarioRepositoryPort } from "src/core/domain/V2/scenario/ports/scenario.repository.port";
import { DomainGuard } from "../access/domain-guard";

export class ScenarioGuard extends DomainGuard<ScenarioRepositoryPort> implements ScenarioRepositoryPort {
    async saveTemplate(template: any): Promise<void> {
        this.enforceAccess(template.id, 'write');
        return (this.target as ScenarioRepositoryPort).saveTemplate(template);
    }

    async findTemplateById(id: string): Promise<any> {
        this.enforceAccess(id, 'read');
        return (this.target as ScenarioRepositoryPort).findTemplateById(id);
    }

    async validateTemplateParameters(templateId: string, input: any): Promise<any> {
        this.enforceAccess(templateId, 'read');
        return (this.target as ScenarioRepositoryPort).validateTemplateParameters(templateId, input);
    }

    async saveInstance(instance: any): Promise<void> {
        this.enforceAccess(instance.id, 'write');
        return (this.target as ScenarioRepositoryPort).saveInstance(instance);
    }

    async findInstanceById(id: string): Promise<any> {
        this.enforceAccess(id, 'read');
        return (this.target as ScenarioRepositoryPort).findInstanceById(id);
    }

    async updateInstanceStepResult(instanceId: string, stepId: string, result: any, output?: any): Promise<void> {
        this.enforceAccess(instanceId, 'execute');
        return (this.target as ScenarioRepositoryPort).updateInstanceStepResult(instanceId, stepId, result, output);
    }

    async pauseInstance(instanceId: string): Promise<void> {
        this.enforceAccess(instanceId, 'write');
        return (this.target as ScenarioRepositoryPort).pauseInstance(instanceId);
    }

    async resumeInstance(instanceId: string): Promise<void> {
        this.enforceAccess(instanceId, 'write');
        return (this.target as ScenarioRepositoryPort).resumeInstance(instanceId);
    }
}