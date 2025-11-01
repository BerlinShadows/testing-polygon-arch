import { Module, Global } from '@nestjs/common';

import { DatabaseConfigModule } from 'src/infrastructure/config/database-config/database-config.module';
import { PgDatabaseService } from './pg-database.service';

@Global()
@Module({
    imports: [DatabaseConfigModule],
    providers: [PgDatabaseService],
    exports: [PgDatabaseService],
})
export class DatabaseModule { }