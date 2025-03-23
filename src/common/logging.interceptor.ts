/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Attempt to get the HTTP request
    const request = context.switchToHttp().getRequest();

    // If request exists, destructure; otherwise, handle accordingly
    if (request) {
      const { method, url } = request;
      const now = Date.now();
      this.logger.log(`Incoming Request: ${method} ${url}`);

      return next.handle().pipe(
        tap(() => {
          const responseTime = Date.now() - now;
          this.logger.log(
            `Outgoing Response: ${method} ${url} - ${responseTime}ms`,
          );
        }),
      );
    } else {
      // Likely a GraphQL or other non-HTTP context
      this.logger.log(
        'No HTTP request object found; handling as non-HTTP context',
      );
      return next.handle();
    }
  }
}
