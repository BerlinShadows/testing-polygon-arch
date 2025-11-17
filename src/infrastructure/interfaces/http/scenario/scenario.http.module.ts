import { Module } from '@nestjs/common';

import { ScenarioController } from './scenario.controller';
import { ScenarioUseCasesModule } from 'src/infrastructure/application/V2/scenario/scenario-use-cases.module';

@Module({
    imports: [ScenarioUseCasesModule],
    controllers: [ScenarioController],
})
export class ScenarioHttpModule { }