import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Pool, PoolConfig } from 'pg';
import { DatabaseConfigService } from 'src/infrastructure/config/database-config/database-config.service';

@Injectable()
export class PgDatabaseService implements OnModuleInit, OnModuleDestroy {
    private pool: Pool;
    private readonly logger = new Logger(PgDatabaseService.name);

    constructor(private dbConfig: DatabaseConfigService) { }

    async onModuleInit() {
        const config = this.dbConfig.get();
        const pgConfig: PoolConfig = {
            host: config.host,
            port: config.port,
            user: config.username,
            password: config.password,
            database: config.name,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        };

        this.pool = new Pool(pgConfig);

        try {
            await this.pool.query('SELECT 1');
            this.logger.log('Connected to PostgreSQL');
        } catch (error) {
            this.logger.error('Failed to connect to PostgreSQL', error.stack);
            throw error;
        }
    }

    async onModuleDestroy() {
        if (this.pool) {
            await this.pool.end();
            this.logger.log('PostgreSQL connection pool closed');
        }
    }

    getPool(): Pool {
        return this.pool;
    }
}