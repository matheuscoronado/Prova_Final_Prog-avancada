import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('API Prova - Usuários')
    .setDescription('Documentação dos endpoints de Login, Criação e Consulta de usuários')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
  console.log('API Gateway rodando em http://localhost:3000');
  console.log('Swagger disponível em http://localhost:3000/docs');
}
bootstrap();