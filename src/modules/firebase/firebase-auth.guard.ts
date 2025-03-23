/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as admin from 'firebase-admin';
import { IS_PUBLIC_KEY } from './public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  private readonly logger = new Logger(FirebaseAuthGuard.name);

  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.debug('Entering FirebaseAuthGuard...');

    // Check if route is marked as Public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      this.logger.debug('Public route. Skipping auth guard.');
      return true;
    }

    let request;
    if (context.getType<string>() === 'graphql') {
      // GraphQL context
      const ctx = GqlExecutionContext.create(context);
      request = ctx.getContext().req;
      this.logger.debug('Detected GraphQL request context');
    } else {
      // REST / other context
      request = context.switchToHttp().getRequest();
    }

    // Extract the token from the Authorization header.
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      this.logger.warn('Missing or invalid Authorization header');
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }
    const token = authHeader.split(' ')[1];

    try {
      this.logger.debug('Verifying Firebase token...');
      const decodedToken = await admin.auth().verifyIdToken(token);
      request.user = decodedToken;
      this.logger.debug(`Token verified. UID=${decodedToken.uid}`);
      return true;
    } catch (error) {
      this.logger.error('Token verification failed', error?.toString());
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
