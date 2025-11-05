import { Args, Int, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import {
    RequestMadeMessage,
    RequestMadeMessageV2,
    RequestMadeMessageV3,
    GetModelResponse,
} from './types/test.types';
import { SendNotificationUseCase } from 'src/core/application/notification/use-cases/send-notification.use-case';

const TARGET_TYPES = ['admin', 'moderator', 'user', 'guest'] as const;
type TargetType = (typeof TARGET_TYPES)[number];

export const pubSub = new PubSub();

@Resolver()
export class TestResolver {
    counter = 1;

    constructor(
        private readonly sendNotificationUseCase: SendNotificationUseCase,
    ) { }

    @Subscription(() => RequestMadeMessage)
    requestMade() {
        return pubSub.asyncIterableIterator('REQUEST_MADE');
    }

    @Subscription(() => RequestMadeMessageV2)
    requestMadeV2() {
        return pubSub.asyncIterableIterator('REQUEST_MADE_V2');
    }

    @Subscription(() => RequestMadeMessageV3)
    requestMadeV3() {
        return pubSub.asyncIterableIterator('REQUEST_MADE_V3');
    }

    @Query(() => GetModelResponse)
    async getModel(
        @Args('id', { type: () => Int }) id: number,
        @Args('nonce', { type: () => String, nullable: true }) nonce: string,
    ): Promise<GetModelResponse> {
        const res: GetModelResponse = {
            success: id === 1 ? true : false,
            message: nonce ?? 'default',
            uiId: nonce ?? '',
        };

        await this.sendNotificationUseCase.execute(
            nonce,
            'websocket',
            'REQUEST_MADE',
            res.message,
            { id: this.counter, timestamp: new Date().toISOString() },
        );
        console.log('[PUBLISH] Событие REQUEST_MADE');
        try {
            pubSub.publish('REQUEST_MADE', {
                requestMade: {
                    id: this.counter,
                    message: res.message,
                    timestamp: new Date().toISOString(),
                },
            });
            this.counter;
            console.log('[PUBLISH] Событие REQUEST_MADE отправлено');
        } catch (err) {
            console.error('Ошибка публикации:', err);
        }

        return res;
    }

    @Query(() => GetModelResponse)
    async getModelV2(
        @Args('id', { type: () => Int }) id: number,
        @Args('nonce', { type: () => String, nullable: true }) nonce: string,
    ) {
        const shouldFail = Math.random() < 0.25;

        if (shouldFail) {
            console.log(
                `[ERROR SIMULATION] getModelV2 failed intentionally (nonce: ${nonce})`,
            );
            throw new Error('Серверная ошибка (имитация)');
        }

        const res: GetModelResponse = {
            success: id === 1 ? true : false,
            message: nonce ?? 'default',
            uiId: nonce ?? '',
        };

        await this.sendNotificationUseCase.execute(
            nonce,
            'websocket',
            'REQUEST_MADE_V2',
            res.message,
            {
                id: this.counter,
                timestamp: new Date().toISOString(),
                type: 'V2',
            },
        );

        console.log('[PUBLISH] Событие REQUEST_MADE_V3 начато');
        try {
            pubSub.publish('REQUEST_MADE_V2', {
                requestMadeV2: {
                    id: this.counter,
                    message: res.message,
                    timestamp: new Date().toISOString(),
                    type: 'V2',
                },
            });
            this.counter++;
            console.log('[PUBLISH] Событие REQUEST_MADE_V2 отправлено');
        } catch (err) {
            console.error('Ошибка публикации V2:', err);
        }

        return res;
    }

    @Query(() => GetModelResponse)
    async getModelV3(
        @Args('id', { type: () => Int }) id: number,
        @Args('nonce', { type: () => String, nullable: true }) nonce: string,
        @Args('targetTypes', { type: () => [String] }) targetTypes: TargetType[],
        @Args('targetValues', { type: () => [String] }) targetValues: string[],
    ) {
        const details = `Дополнительные данные для ID=${this.counter}`;

        const res: GetModelResponse = {
            success: id === 1 ? true : false,
            message: nonce ?? 'default',
            uiId: nonce ?? '',
        };

        await this.sendNotificationUseCase.execute(
            nonce,
            'websocket',
            'REQUEST_MADE_V3',
            res.message,
            {
                id: this.counter,
                timestamp: new Date().toISOString(),
                type: 'V3',
                details,
                targetTypes,
                targetValues,
            },
        );

        console.log(
            '[PUBLISH] Событие REQUEST_MADE_V3: ',
            targetTypes,
            targetValues,
        );

        try {
            pubSub.publish('REQUEST_MADE_V3', {
                requestMadeV3: {
                    id: this.counter,
                    message: res.message,
                    timestamp: new Date().toISOString(),
                    type: 'V3',
                    details,
                    targetTypes,
                    targetValues,
                },
            });
            this.counter++;
            console.log('[PUBLISH] Событие REQUEST_MADE_V3 отправлено');
        } catch (err) {
            console.error('Ошибка публикации V3:', err);
        }

        return res;
    }
}
