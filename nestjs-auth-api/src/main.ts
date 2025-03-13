import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors({
    origin: 'http://localhost:5173', 
    credentials: true, // Allow cookies & authentication headers
  });

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('API for user authentication')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000).then(()=>{
    console.log('http://localhost:3000/api-docs, click here to see API documentation');
  });
}
bootstrap();
