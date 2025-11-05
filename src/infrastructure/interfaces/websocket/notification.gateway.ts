import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { LoggingService } from 'src/core/application/logging/services/logging.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class NotificationGateway
    implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly logger: LoggingService,) {

    }
    @WebSocketServer()
    server: Server;

    private userSockets = new Map<string, string[]>();

    handleConnection(client: Socket) {
        this.logger.debug(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.debug(`Client disconnected: ${client.id}`);
        for (const [userId, sockets] of this.userSockets) {
            const filtered = sockets.filter((id) => id !== client.id);
            if (filtered.length === 0) {
                this.userSockets.delete(userId);
            } else {
                this.userSockets.set(userId, filtered);
            }
        }
    }

    @SubscribeMessage('register')
    handleRegister(client: Socket, userId: string): void {
        this.logger.debug(`User ${userId} registered with socket ${client.id}`);
        if (!this.userSockets.has(userId)) {
            this.userSockets.set(userId, []);
        }
        this.userSockets.get(userId)!.push(client.id);
    }

    sendToUser(userId: string, payload: any): void {
        const sockets = this.userSockets.get(userId);
        if (sockets) {
            sockets.forEach((socketId) => {
                this.server.to(socketId).emit('notification', payload);
            });
        } else {
            this.logger.warn(`No active socket for user ${userId}`);
        }
    }
}
