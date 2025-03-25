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
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    // Check if request is GraphQL
    const gqlContext = GqlExecutionContext.create(context);
    const isGraphQL = gqlContext.getType() === 'graphql';

    if (isGraphQL) {
      // Get context GraphQL
      const ctx = gqlContext.getContext<{
        req: { body: { query?: string } };
      }>();
      const info: import('graphql').GraphQLResolveInfo = gqlContext.getInfo();
      const operationName = info.operation?.name?.value || 'Unnamed Operation';

      // Get the query from the GraphQL body
      const query = ctx?.req?.body?.query || 'Unknown Query';
      const shortQuery = query.split('\n').join(' ').substring(0, 50) + '...'; // Shorten for log

      const logMessage = `Incoming GraphQL Request: ${operationName} - ${shortQuery}`;
      this.logger.log(logMessage);

      return next.handle().pipe(
        tap(() => {
          const responseTime = Date.now() - now;
          this.logger.log(
            `Outgoing GraphQL Response: ${operationName} - ${responseTime}ms`,
          );
        }),
      );
    } else {
      // Handling HTTP Requests
      const request = context.switchToHttp().getRequest();
      if (request) {
        const { method, url } = request;
        const logMessage = `Incoming Request: ${method} ${url}`;
        this.logger.log(logMessage);

        return next.handle().pipe(
          tap(() => {
            const responseTime = Date.now() - now;
            this.logger.log(
              `Outgoing Response: ${method} ${url} - ${responseTime}ms`,
            );
          }),
        );
      } else {
        this.logger.log('Incoming Request: Context not available');
        return next.handle().pipe(
          tap(() => {
            const responseTime = Date.now() - now;
            this.logger.log(`Outgoing Response: Unknown - ${responseTime}ms`);
          }),
        );
      }
    }
  }
}
