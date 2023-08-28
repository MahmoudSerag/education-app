import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as xss from 'xss-clean';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      process.env.CLIENT_DOMAIN_ONE,
      process.env.CLIENT_DOMAIN_TWO,
      process.env.CLIENT_DOMAIN_THREE,
    ],
    credentials: true,
    methods: ['GET', 'PATCH', 'POST', 'DELETE', 'PUT'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });

  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE)
    .setDescription(process.env.SWAGGER_DESCRIPTION)
    .setVersion('1.0')
    .addTag('APIs')
    .addServer(process.env.SWAGGER_SERVER_ONE)
    .addServer(process.env.SWAGGER_SERVER_TWO)
    .addServer(process.env.SWAGGER_SERVER_THREE)
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
