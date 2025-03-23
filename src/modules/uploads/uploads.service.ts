/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/uploads/uploads.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UploadsService {
  private storage: Storage;
  private bucketName = process.env.BUCKET_NAME as string;

  constructor() {
    const storageOptions: ConstructorParameters<typeof Storage>[0] = {
      projectId: process.env.PROJECT_ID,
      keyFilename: path.join(process.cwd(), 'src/config/google/google.json'),
    };
    this.storage = new Storage(storageOptions);
  }

  async uploadToBucket(filePath: string, destination: string): Promise<string> {
    try {
      await this.storage.bucket(this.bucketName).upload(filePath, {
        destination,
        metadata: {
          cacheControl: 'public, max-age=31536000',
        },
      });

      // Construct the public URL
      const imageUrl = `https://storage.googleapis.com/${this.bucketName}/${destination}`;
      console.log(`File uploaded to ${imageUrl}`);

      // Remove the temporary file
      fs.unlinkSync(filePath);

      return imageUrl;
    } catch (error) {
      console.error('Error uploading file to bucket:', error);
      throw new InternalServerErrorException('Failed to upload image');
    }
  }

  async generateSignedUrl(imageUrl: string): Promise<string> {
    try {
      const filePath = imageUrl.split(`${this.bucketName}/`)[1];
      const options = {
        version: 'v4' as const,
        action: 'read' as const,
        expires: Date.now() + 60 * 60 * 1000, // Expires in 1 hour
      };

      const [signedUrl] = await this.storage
        .bucket(this.bucketName)
        .file(filePath)
        .getSignedUrl(options);
      return signedUrl;
    } catch (error) {
      console.error('Error generating signed URL:', error);
      throw new InternalServerErrorException('Failed to generate signed URL');
    }
  }
}
