import { plainToInstance } from 'class-transformer';
import { validateSync, IsInt, IsString, IsEnum, IsIP } from 'class-validator';

import type { Environment } from 'src/core/common/types';

class EnvVariables {
    @IsInt()
    APP_PORT: number;

    @IsString()
    @IsIP()
    APP_HOST: string;

    @IsString()
    @IsEnum(['development', 'production', 'test'])
    NODE_ENV: Environment;
}

export interface AppConfig {
    port: number;
    host: string;
    env: Environment;
    isDev: boolean;
    isProd: boolean;
}

export function loadAppConfig(): AppConfig {
    const env = plainToInstance(EnvVariables, {
        APP_PORT: parseInt(process.env.APP_PORT || process.env.PORT || '3000', 10),
        APP_HOST: process.env.APP_HOST || '0.0.0.0',
        NODE_ENV: process.env.NODE_ENV ?? 'development',
    });

    const errors = validateSync(env, { skipMissingProperties: false });
    if (errors.length > 0) {
        const messages = errors.map(e => Object.values(e.constraints || {}).join(', ')).join('; ');
        throw new Error(`App config validation failed: ${messages}`);
    }

    return {
        port: env.APP_PORT,
        host: env.APP_HOST,
        env: env.NODE_ENV,
        isDev: env.NODE_ENV === 'development',
        isProd: env.NODE_ENV === 'production',
    };
}