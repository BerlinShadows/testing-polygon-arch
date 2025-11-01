import { Injectable } from '@nestjs/common';
import { AppConfig, loadAppConfig } from './app.config';

@Injectable()
export class AppConfigService {
    private readonly config: AppConfig;

    constructor() {
        this.config = loadAppConfig();
    }

    get port(): number {
        return this.config.port;
    }

    get host(): string {
        return this.config.host;
    }

    get env(): string {
        return this.config.env;
    }

    get isDev(): boolean {
        return this.config.isDev;
    }
}