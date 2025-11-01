import { Injectable } from '@nestjs/common';
import { DatabaseConfig, loadDatabaseConfig } from './database.config';

@Injectable()
export class DatabaseConfigService {
  private readonly config: DatabaseConfig;

  constructor() {
    this.config = loadDatabaseConfig();
  }

  get(): DatabaseConfig {
    return this.config;
  }

  get host(): string {
    return this.config.host;
  }

  get port(): number {
    return this.config.port;
  }

  get name(): string {
    return this.config.name;
  }
}
