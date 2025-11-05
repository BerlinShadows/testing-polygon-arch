import { MessageBrokerPort } from '../ports/message-broker.port';

export class SendMessageUseCase {
    constructor(private readonly broker: MessageBrokerPort) { }

    async execute(queue: string, message: any): Promise<void> {
        await this.broker.publish(queue, message);
    }
}