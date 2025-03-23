// src/uploads/uploads.module.ts
import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService, FirebaseAuthGuard],
})
export class UploadsModule {}
