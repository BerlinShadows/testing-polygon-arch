import { Injectable } from "@nestjs/common";
import { AbstractScenarioRepositoryPort } from "src/core/domain/V2/scenario/ports/abstract-scenario-repository.port";
import { ScenarioTemplate } from "src/core/domain/V2/scenario/scenario.entity";
import { ScenarioTemplateFactory } from "src/core/domain/V2/scenario/scenario.factory";
import { PgDatabaseService } from "../database/pg-database.service";

@Injectable()
export class PgScenarioRepository implements AbstractScenarioRepositoryPort {
  constructor(private readonly pg: PgDatabaseService) { }

  async saveTemplate(template: ScenarioTemplate): Promise<void> {
    const query = `
      INSERT INTO scenario_templates (
        id, name, description, version, parameters, steps, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        version = EXCLUDED.version,
        parameters = EXCLUDED.parameters,
        steps = EXCLUDED.steps,
        updated_at = NOW();
    `;
    const values = [
      template.id,
      template.name,
      template.description || null,
      template.version,
      JSON.stringify(template.parameters),
      JSON.stringify(template.steps),
    ];
    await this.pg.getPool().query(query, values);
  }

  async findTemplateById(id: string): Promise<ScenarioTemplate | null> {
    const query = `
      SELECT id, name, description, version, parameters, steps, created_at
      FROM scenario_templates
      WHERE id = $1;
    `;
    const result = await this.pg.getPool().query(query, [id]);
    return result.rows.length ? this.mapRowToScenarioTemplate(result.rows[0]) : null;
  }

  async validateTemplateParameters(
    templateId: string,
    input: Record<string, unknown>,
  ): Promise<{ valid: true } | { valid: false; errors: string[] }> {
    const template = await this.findTemplateById(templateId);
    if (!template) {
      return { valid: false, errors: ['Template not found'] };
    }
    return template.validateParameters(input);
  }

  async saveInstance(instance: any): Promise<void> {
    const query = `
    INSERT INTO scenario_instances (
      id, template_id, template_version, status, input_parameters,
      current_step_id, step_results, started_at, completed_at, paused_at,
      created_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW());
  `;
    const values = [
      instance.id,
      instance.templateId,
      instance.templateVersion,
      instance.status,
      JSON.stringify(instance.inputParameters),
      instance.currentStepId,
      JSON.stringify(instance.stepResults),
      instance.startedAt,
      instance.completedAt,
      instance.pausedAt,
    ];
    await this.pg.getPool().query(query, values);
  }

  async findInstanceById(id: string): Promise<any | null> {
    const query = `
    SELECT id, template_id, template_version, status, input_parameters,
           current_step_id, step_results, started_at, completed_at, paused_at
    FROM scenario_instances
    WHERE id = $1;
  `;
    const result = await this.pg.getPool().query(query, [id]);
    return result.rows.length ? result.rows[0] : null;
  }

  async updateInstanceStepResult(
    instanceId: string,
    stepId: string,
    result: any,
    output?: unknown,
  ): Promise<void> {
    throw new Error('Not implemented');
  }

  async pauseInstance(instanceId: string): Promise<void> {
    const query = `
    UPDATE scenario_instances
    SET status = 'paused', paused_at = NOW(), updated_at = NOW()
    WHERE id = $1;
  `;
    await this.pg.getPool().query(query, [instanceId]);
  }

  async resumeInstance(instanceId: string): Promise<void> {
    const query = `
    UPDATE scenario_instances
    SET status = 'running', paused_at = NOW(), updated_at = NOW()
    WHERE id = $1;
  `;
    await this.pg.getPool().query(query, [instanceId]);
  }

  private mapRowToScenarioTemplate(row: any): ScenarioTemplate {
    return ScenarioTemplateFactory.create({
      id: row.id,
      name: row.name,
      description: row.description,
      version: row.version,
      parameters: row.parameters,
      steps: row.steps,
    });
  }
}