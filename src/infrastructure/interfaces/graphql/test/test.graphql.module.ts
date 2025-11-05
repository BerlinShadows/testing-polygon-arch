import { Module } from '@nestjs/common';

import { TestResolver } from './test.resolver';
import { NotificationUseCasesModule } from 'src/infrastructure/application/notification/notification-use-cases.module';

@Module({
    imports: [NotificationUseCasesModule],
    providers: [TestResolver],
})
export class TestGraphQLModule { }