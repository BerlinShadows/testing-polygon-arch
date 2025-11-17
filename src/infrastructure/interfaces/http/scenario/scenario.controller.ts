import { Body, Controller, Get, Param, Post, Query, } from '@nestjs/common';

import { CreateScenarioTemplateUseCase } from 'src/core/application/V2/scenario/use-cases/create-scenario-template.use-case';
import { GetScenarioStatusUseCase } from 'src/core/application/V2/scenario/use-cases/get-scenario-status.use-case';
import { ListScenariosByOwnerUseCase } from 'src/core/application/V2/scenario/use-cases/list-scenarios-by-owner.use-case';
import { PauseScenarioUseCase } from 'src/core/application/V2/scenario/use-cases/pause-scenario.use-case';
import { StartScenarioUseCase } from 'src/core/application/V2/scenario/use-cases/start-scenario.use-case';
import type { CreateScenarioTemplateDto } from 'src/core/domain/V2/scenario/scenario.entity';

@Controller('scenarios')
export class ScenarioController {
    constructor(
        private readonly startUseCase: StartScenarioUseCase,
        private readonly statusUseCase: GetScenarioStatusUseCase,
        private readonly listUseCase: ListScenariosByOwnerUseCase,
        private readonly createTemplateUseCase: CreateScenarioTemplateUseCase,
        private readonly pauseUseCase: PauseScenarioUseCase,
    ) { }

    @Post('templates')
    async createTemplate(@Body() dto: CreateScenarioTemplateDto) {
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

    @Post(':id/pause')
    async pause(@Param('id') id: string) {
        await this.pauseUseCase.execute(id);
        return { success: true };
    }
}