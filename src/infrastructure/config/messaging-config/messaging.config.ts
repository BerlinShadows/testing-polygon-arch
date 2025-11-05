import * as dotenv from 'dotenv';
dotenv.config();

import { plainToInstance } from 'class-transformer';
import { validateSync, IsString, IsInt } from 'class-validator';

class RabbitMQEnv {
  @IsString()
  RABBITMQ_HOST: string;

  @IsInt()
  RABBITMQ_PORT: number;

  @IsString()
  RABBITMQ_USER: string;

  @IsString()
  RABBITMQ_PASSWORD: string;

  @IsString()
  RABBITMQ_QUEUE: string;
}

export interface RabbitMQConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  queue: string;
}

export function loadRabbitMQConfig(): RabbitMQConfig {
  const env = plainToInstance(RabbitMQEnv, {
    RABBITMQ_HOST: process.env.RABBITMQ_HOST || 'localhost',
    RABBITMQ_PORT: parseInt(process.env.RABBITMQ_PORT || '5672', 10),
    RABBITMQ_USER: process.env.RABBITMQ_USER || 'guest',
    RABBITMQ_PASSWORD: process.env.RABBITMQ_PASSWORD || 'guest',
    RABBITMQ_QUEUE: process.env.RABBITMQ_QUEUE || 'notifications',
  });

  const errors = validateSync(env, { skipMissingProperties: false });
  if (errors.length > 0) {
    const messages = errors.map(e => Object.values(e.constraints || {}).join(', ')).join('; ');
    throw new Error(`RabbitMQ config validation failed: ${messages}`);
  }

  return {
    host: env.RABBITMQ_HOST,
    port: env.RABBITMQ_PORT,
    user: env.RABBITMQ_USER,
    password: env.RABBITMQ_PASSWORD,
    queue: env.RABBITMQ_QUEUE,
  };
}