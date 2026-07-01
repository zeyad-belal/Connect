import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ImageKit from 'imagekit';

export interface UploadedImage {
  url: string;
  fileId: string;
}

/**
 * Thin wrapper around the ImageKit SDK. Centralizing it here means feature
 * services depend on a small, mockable interface instead of the SDK directly.
 */
@Injectable()
export class ImageKitService {
  private client?: ImageKit;

  constructor(private readonly config: ConfigService) {}

  /**
   * Built on first use, not in the constructor: the SDK throws if the keys are
   * empty, and we don't want a missing-ImageKit-config to stop the whole app
   * from booting. The error only surfaces when an upload is actually attempted.
   */
  private getClient(): ImageKit {
    if (!this.client) {
      const publicKey = this.config.get<string>('IMAGEKIT_PUBLIC_KEY', '');
      const privateKey = this.config.get<string>('IMAGEKIT_PRIVATE_KEY', '');
      const urlEndpoint = this.config.get<string>('IMAGEKIT_URL_ENDPOINT', '');

      if (!publicKey || !privateKey || !urlEndpoint) {
        throw new InternalServerErrorException(
          'ImageKit is not configured (set IMAGEKIT_* env vars).',
        );
      }

      this.client = new ImageKit({ publicKey, privateKey, urlEndpoint });
    }
    return this.client;
  }

  async upload(
    file: Express.Multer.File,
    folder: string,
  ): Promise<UploadedImage> {
    try {
      const result = await this.getClient().upload({
        file: file.buffer.toString('base64'),
        fileName: file.originalname,
        folder,
      });
      return { url: result.url, fileId: result.fileId };
    } catch {
      throw new InternalServerErrorException(
        'There was an error uploading the image to ImageKit.',
      );
    }
  }

  async uploadMany(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<UploadedImage[]> {
    return Promise.all(files.map((file) => this.upload(file, folder)));
  }

  async delete(fileIds: string[]): Promise<void> {
    const ids = fileIds.filter(Boolean);
    if (ids.length === 0) return;
    try {
      await this.getClient().bulkDeleteFiles(ids);
    } catch {
      throw new InternalServerErrorException(
        'There was an error deleting the image from ImageKit.',
      );
    }
  }
}
