import { Body, Controller, Get, Param, Post, Query, } from '@nestjs/common';
import * as createScenarioTemplateUseCase from 'src/core/application/V2/scenario/use-cases/create-scenario-template.use-case';

import { GetScenarioStatusUseCase } from 'src/core/application/V2/scenario/use-cases/get-scenario-status.use-case';
import { ListScenariosByOwnerUseCase } from 'src/core/application/V2/scenario/use-cases/list-scenarios-by-owner.use-case';
import { StartScenarioUseCase } from 'src/core/application/V2/scenario/use-cases/start-scenario.use-case';

@Controller('scenarios')
export class ScenarioController {
    constructor(
        private readonly startUseCase: StartScenarioUseCase,
        private readonly statusUseCase: GetScenarioStatusUseCase,
        private readonly listUseCase: ListScenariosByOwnerUseCase,
        private readonly createTemplateUseCase: createScenarioTemplateUseCase.CreateScenarioTemplateUseCase,
    ) { }

    @Post('templates')
    async createTemplate(@Body() dto: createScenarioTemplateUseCase.CreateScenarioTemplateDto) {
        const templateId = await this.createTemplateUseCase.execute(dto);
        return { id: templateId };
    }

    @Post('start')
    async start(@Body() dto: { templateId: string; inputParameters: Record<string, unknown> }) {
        const instanceId = await this.startUseCase.execute(dto.templateId, dto.inputParameters);
        return { id: instanceId };
    }

    @Get(':id')
    async status(@Param('id') id: string) {
        return this.statusUseCase.execute(id);
    }

    @Get()
    async list(@Query('ownerId') ownerId: string) {
        return this.listUseCase.execute(ownerId);
    }
}