import { Injectable } from '@nestjs/common';

import { RabbitMQConfig, loadRabbitMQConfig } from './messaging.config';

@Injectable()
export class RabbitMQConfigService {
  private readonly config: RabbitMQConfig;

  constructor() {
    this.config = loadRabbitMQConfig();
  }

  get(): RabbitMQConfig {
    return this.config;
  }

  getConnectionString(): string {
    return `amqp://${this.config.user}:${this.config.password}@${this.config.host}:${this.config.port}`;
  }
}
