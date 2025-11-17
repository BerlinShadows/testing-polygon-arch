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
    throw new Error('Not implemented');
  }

  async findInstanceById(id: string): Promise<any | null> {
    throw new Error('Not implemented');
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
    throw new Error('Not implemented');
  }

  async resumeInstance(instanceId: string): Promise<void> {
    throw new Error('Not implemented');
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