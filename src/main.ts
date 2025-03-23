import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  app.useGlobalInterceptors(new LoggingInterceptor());
  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT);
  console.log(`🚀 Jandy API is running at http://localhost:${PORT}/graphql`);
  console.log(
    `🚀 Test token endpoint available at http://localhost:${PORT}/generate-test-token`,
  );
}
bootstrap();
