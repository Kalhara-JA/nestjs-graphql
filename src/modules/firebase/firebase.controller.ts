/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import * as admin from 'firebase-admin';
import { Public } from './public.decorator';

@Controller()
export class FirebaseController {
  private readonly logger = new Logger(FirebaseController.name);

  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {}

  @Public()
  @Get('generate-test-token')
  async generateTestToken(@Res() res: Response): Promise<void> {
    this.logger.log('Called generateTestToken endpoint');
    try {
      const testUid = 'H2JSXUdT0LVfTvDuXBlBKkEdhjv2'; // Test UID
      this.logger.debug(`Generating custom token for test UID=${testUid}`);
      const customToken = await this.firebaseAdmin
        .auth()
        .createCustomToken(testUid);
      this.logger.debug('Custom token generated successfully');
      res.json({ customToken });
    } catch (error) {
      this.logger.error('Error generating test token', error?.toString());
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Failed to generate test token' });
    }
  }
}
