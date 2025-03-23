/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/uploads/uploads.controller.ts
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@Controller('api')
@UseGuards(FirebaseAuthGuard)
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file', { dest: 'uploads/' }))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('offerId') offerId: string,
  ) {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }

    const extension = file.originalname.split('.').pop();
    const bucketPath = `home/offers/${offerId}.${extension}`;

    try {
      const imageUrl = await this.uploadsService.uploadToBucket(
        file.path,
        bucketPath,
      );
      return { imageUrl };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new HttpException(
        'Failed to upload image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
