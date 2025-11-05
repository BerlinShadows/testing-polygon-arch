import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Channel, ChannelModel, connect } from 'amqplib';
import { MessageBrokerPort } from 'src/core/application/messaging/ports/message-broker.port';
import { RabbitMQConfigService } from 'src/infrastructure/config/messaging-config/messaging-config.service';

@Injectable()
export class RabbitMQAdapter implements MessageBrokerPort, OnModuleInit, OnModuleDestroy {
  private connection: ChannelModel;
  private channel: Channel;
  private queue: string;

  constructor(private readonly configService: RabbitMQConfigService) { }

  async onModuleInit() {
    const connectionString = this.configService.getConnectionString();
    this.queue = this.configService.get().queue;
    
    this.connection = await connect(connectionString);
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queue, { durable: true });
    console.log('Connected to RabbitMQ');
  }

  async onModuleDestroy() {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
    console.log('RabbitMQ connection closed');
  }

  async publish(queue: string, message: any): Promise<void> {
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
  }
}