import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface RoomMessage {
  message: unknown;
  room: string;
}

/**
 * Real-time chat + notifications. Each @SubscribeMessage replaces one of the
 * raw `socket.on(...)` handlers from the Express app.
 *
 * Security:
 * - CORS is restricted to an explicit allowlist (CORS_ORIGINS, applied via the
 *   WsCorsAdapter at bootstrap) instead of reflecting any origin.
 * - Every connection must present a valid JWT (handshake `auth.token` or an
 *   Authorization header); unauthenticated sockets are disconnected, so only
 *   logged-in users can send/receive messages.
 *
 * Client contract change: events carry a single payload object
 * (`{ message, room }`) and the socket must connect with
 * `io(URL, { auth: { token } })`.
 *
 * KNOWN LIMITATION: rooms are arbitrary client-supplied strings (including the
 * shared 'global' notification room), so order-scoped room membership is not
 * enforced here. Tightening that requires a room-naming convention
 * (e.g. `order-<id>`) mapped back to buyer/seller — tracked as a follow-up.
 */
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  handleConnection(socket: Socket) {
    try {
      const token = this.extractToken(socket);
      const payload = this.jwt.verify(token, {
        secret: this.config.getOrThrow<string>('JWT_SECRET'),
      });
      // Stash identity for downstream handlers / future room checks.
      socket.data.user = { id: payload.id, role: payload.role };
    } catch {
      this.logger.warn(`Rejected unauthenticated socket ${socket.id}`);
      socket.disconnect(true);
    }
  }

  @SubscribeMessage('send-message')
  handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { message, room }: RoomMessage,
  ) {
    if (!room) return;
    socket.join(room);
    socket.to(room).emit('receive-message', message);
  }

  @SubscribeMessage('send-noti')
  handleNotification(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { message, room }: RoomMessage,
  ) {
    if (!room) return;
    socket.join(room);
    socket.to(room).emit('receive-noti', message);
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody('room') room: string,
  ) {
    if (!room) return;
    socket.join(room);
    this.logger.log(`User ${socket.id} joined room ${room}`);
  }

  private extractToken(socket: Socket): string {
    const fromAuth = socket.handshake.auth?.token as string | undefined;
    if (fromAuth) return fromAuth.replace(/^Bearer\s+/i, '');

    const header = socket.handshake.headers.authorization;
    if (header) return header.replace(/^Bearer\s+/i, '');

    throw new Error('Missing token');
  }
}
