import { Module } from '@nestjs/common';
import { ConfigModule } from '../infrastructure/config/config.module';
import { CoreModule } from 'src/core/core.module';

@Module({
    imports: [
        ConfigModule,
        CoreModule
    ],
})
export class AppModule { }