import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { WebSocketNotificationChannel } from './websocket-notification.channel';

@Module({
    providers: [
        NotificationGateway,
        WebSocketNotificationChannel
    ],
    exports: [
        WebSocketNotificationChannel
    ],
})
export class WebsocketModule { }