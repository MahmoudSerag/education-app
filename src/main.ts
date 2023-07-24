import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as xss from 'xss-clean';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });

  const config = new DocumentBuilder()
    .setTitle('Education-App APIs Documentation')
    .setDescription(
      `<h4>Discover our concise and professional Swagger documentation, providing a comprehensive overview of our APIs. This indispensable resource outlines endpoints, request and response formats, authentication methods, and error handling guidelines. Seamlessly integrate our APIs and unleash the full potential of your applications.</h4>`,
    )
    .setVersion('1.0')
    .addTag('APIs')
    .addCookieAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apis/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  app.use(helmet());
  app.use(xss());

  app.use(cookieParser());

  const port = process.env.SERVER_PORT || 3000;
  await app.listen(port, () => {
    console.log(`Server listening to port: ${port}`);
  });
}
bootstrap();
