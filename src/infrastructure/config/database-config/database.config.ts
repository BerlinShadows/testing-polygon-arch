import { plainToInstance } from 'class-transformer';
import { validateSync, IsString, IsInt } from 'class-validator';

class DatabaseEnv {
  @IsString()
  DATABASE_HOST: string;

  @IsInt()
  DATABASE_PORT: number;

  @IsString()
  DATABASE_USERNAME: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_NAME: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}

export function loadDatabaseConfig(): DatabaseConfig {
  const env = plainToInstance(DatabaseEnv, {
    DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
    DATABASE_PORT: parseInt(process.env.DATABASE_PORT || '5432', 10),
    DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'postgres',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'postgres',
    DATABASE_NAME: process.env.DATABASE_NAME || 'app_db',
  });

  const errors = validateSync(env, { skipMissingProperties: false });
  if (errors.length > 0) {
    const messages = errors
      .map((e) => Object.values(e.constraints || {}).join(', '))
      .join('; ');
    throw new Error(`Database config validation failed: ${messages}`);
  }

  return {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    name: env.DATABASE_NAME,
  };
}
