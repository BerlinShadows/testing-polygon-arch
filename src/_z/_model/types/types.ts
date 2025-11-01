import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GetModelResponse {
    @Field()
    success: boolean;

    @Field()
    message: string;

    @Field()
    uiId: string
}

@ObjectType()
export class RequestMadeMessage {
    @Field()
    uiId: string

    @Field()
    message: string;

    @Field()
    timestamp: string;

    @Field()
    id: number;
}

@ObjectType()
export class RequestMadeMessageV2 {
    @Field()
    uiId: string

    @Field()
    message: string;

    @Field()
    timestamp: string;

    @Field()
    id: number;

    @Field()
    type: string;
}

@ObjectType()
export class RequestMadeMessageV3 {
    @Field()
    uiId: string

    @Field()
    message: string;

    @Field()
    id: number;

    @Field()
    timestamp: string;

    @Field()
    type: string;

    @Field()
    details: string;
}
