export abstract class MessageBrokerPort {
    abstract publish(queue: string, message: any): Promise<void>;
}