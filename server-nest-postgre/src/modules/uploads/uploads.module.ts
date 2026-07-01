import { Global, Module } from '@nestjs/common';
import { ImageKitService } from './imagekit.service';

/**
 * Global so any feature module that handles images can inject ImageKitService
 * without re-importing this module.
 */
@Global()
@Module({
  providers: [ImageKitService],
  exports: [ImageKitService],
})
export class UploadsModule {}
