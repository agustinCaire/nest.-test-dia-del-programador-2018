import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggingInterceptor } from 'common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggingInterceptor()); // Usar Interceptor a nivel global


  // Swagger Setup
  const options = new DocumentBuilder()
  .setTitle('API de personas')
  .setDescription('API de prueba de Nest.JS que permite almacenar datos de Personas')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, { swaggerOptions: { port: 3001 } });

  await app.listen(3000);
}
bootstrap();
