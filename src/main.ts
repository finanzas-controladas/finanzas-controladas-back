import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // -**********************************-
  // Documentation Bootstrap
  const config = new DocumentBuilder()
    .setTitle('Finanzas Controladas API')
    .setDescription('')
    .setVersion('1.0')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  // -**********************************-

  const logger = new Logger('Main');
  const PORT = 3000;
  await app.listen(process.env.PORT || PORT, '0.0.0.0', () => {
    logger.log(`API running on port: ${PORT}`);
  });
}
bootstrap();
