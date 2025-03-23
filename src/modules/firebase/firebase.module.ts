/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module, Global, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import serviceAccount from '../../config/firebase/jandy-firebase-adminsdk-kalhara.json';
import { FirebaseController } from './firebase.controller';

@Global()
@Module({
  controllers: [FirebaseController],
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        const logger = new Logger('FirebaseModule');
        try {
          logger.log('Initializing Firebase Admin SDK...');
          const credential = admin.credential.cert(
            serviceAccount as admin.ServiceAccount,
          );
          const app = admin.initializeApp({ credential });
          logger.log('Firebase Admin SDK initialized successfully.');
          return app;
        } catch (error: unknown) {
          if (error instanceof Error) {
            logger.error('Firebase initialization error:', error.message);
          } else {
            logger.error('Firebase initialization error:', error);
          }
          throw new Error('Failed to initialize Firebase Admin SDK');
        }
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
