import { Args, Int, Query, Resolver, Subscription } from "@nestjs/graphql";
import { pubSub } from "src/_z/pubsub";
import { GetModelResponse, RequestMadeMessage, RequestMadeMessageV2, RequestMadeMessageV3 } from "./types/types";


const TARGET_TYPES = ['admin', 'moderator', 'user', 'guest'] as const;
type TargetType = typeof TARGET_TYPES[number];

@Resolver()
export class ModelResolver {
    c: number = 1;
    constructor(
    ) { }

    @Subscription(() => RequestMadeMessage)
    requestMade() {
        return pubSub.asyncIterableIterator('REQUEST_MADE');
    }

    @Query(() => GetModelResponse)
    getModel(
        @Args('id', { type: () => Int }) id: number,
        @Args('nonce', { type: () => String, nullable: true }) nonce?: string,
    ): GetModelResponse {

        const res: GetModelResponse = {
            success: id === 1 ? true : false,
            message: nonce ?? 'default',
            uiId: nonce ?? '',
        }
        console.log('[PUBLISH] Событие REQUEST_MADE');
        try {
            pubSub.publish('REQUEST_MADE', {
                requestMade: {
                    id: this.c,
                    message: res.message,
                    timestamp: new Date().toISOString(),
                },
            });
            this.c++;
            console.log('[PUBLISH] Событие REQUEST_MADE отправлено');
        } catch (err) {
            console.error('Ошибка публикации:', err);
        }

        return res;
    }

    @Subscription(() => RequestMadeMessageV2)
    requestMadeV2() {
        return pubSub.asyncIterableIterator('REQUEST_MADE_V2');
    }

    @Query(() => GetModelResponse)
    getModelV2(
        @Args('id', { type: () => Int }) id: number,
        @Args('nonce', { type: () => String, nullable: true }) nonce?: string,
    ) {
        const shouldFail = Math.random() < 0.25;

        if (shouldFail) {
            console.log(`[ERROR SIMULATION] getModelV2 failed intentionally (nonce: ${nonce})`);
            throw new Error('Серверная ошибка (имитация)');
        }

        const res: GetModelResponse = {
            success: id === 1 ? true : false,
            message: nonce ?? 'default',
            uiId: nonce ?? '',
        }
        console.log('[PUBLISH] Событие REQUEST_MADE_V3 начато');
        try {
            pubSub.publish('REQUEST_MADE_V2', {
                requestMadeV2: {
                    id: this.c,
                    message: res.message,
                    timestamp: new Date().toISOString(),
                    type: 'V2',
                },
            });
            this.c++;
            console.log('[PUBLISH] Событие REQUEST_MADE_V2 отправлено');
        } catch (err) {
            console.error('Ошибка публикации V2:', err);
        }

        return res;
    }

    @Subscription(() => RequestMadeMessageV3)
    requestMadeV3() {
        return pubSub.asyncIterableIterator('REQUEST_MADE_V3');
    }

    @Query(() => GetModelResponse)
    getModelV3(
        @Args('id', { type: () => Int }) id: number,
        @Args('targetTypes', { type: () => [String] }) targetTypes: TargetType[],
        @Args('targetValues', { type: () => [String] }) targetValues: string[],
        @Args('nonce', { type: () => String, nullable: true }) nonce?: string,
    ) {
        const details = `Дополнительные данные для ID=${this.c}`;

        const res: GetModelResponse = {
            success: id === 1 ? true : false,
            message: nonce ?? 'default',
            uiId: nonce ?? '',
        }

        console.log('[PUBLISH] Событие REQUEST_MADE_V3: ', targetTypes, targetValues);

        try {
            pubSub.publish('REQUEST_MADE_V3', {
                requestMadeV3: {
                    id: this.c,
                    message: res.message,
                    timestamp: new Date().toISOString(),
                    type: 'V3',
                    details,
                    targetTypes,
                    targetValues,
                },
            });
            this.c++;
            console.log('[PUBLISH] Событие REQUEST_MADE_V3 отправлено');
        } catch (err) {
            console.error('Ошибка публикации V3:', err);
        }

        return res;
    }
}