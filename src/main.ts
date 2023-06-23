import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as xss from 'xss-clean';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });

  const config = new DocumentBuilder()
    .setTitle('Education-App')
    .setDescription('Education-Platform APIs description')
    .setVersion('1.0')
    .addTag('APIs')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apis/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  app.use(helmet());
  app.use(xss());

  const port = process.env.SERVER_PORT || 3000;
  await app.listen(port, () => {
    console.log(`Server listening to port: ${port}`);
  });
}
bootstrap();