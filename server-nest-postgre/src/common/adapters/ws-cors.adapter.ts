import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';

/**
 * Applies an explicit CORS allowlist to the Socket.IO server. Configured at
 * bootstrap (where ConfigModule has already loaded the env) rather than in the
 * @WebSocketGateway decorator, which would evaluate before env is available.
 */
export class WsCorsAdapter extends IoAdapter {
  constructor(
    app: INestApplicationContext,
    private readonly origins: string[],
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions): Server {
    return super.createIOServer(port, {
      ...options,
      cors: {
        origin: this.origins.length ? this.origins : false,
        credentials: true,
      },
    }) as Server;
  }
}
