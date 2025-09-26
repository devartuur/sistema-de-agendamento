import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get<ConfigService<Env, true>>(ConfigService)

  const port = configService.get('PORT', { infer: true })

  // Swagger configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Sistema de Agendamento API')
    .setDescription('Documentação da API do Sistema de Agendamento')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Insira o token JWT no formato: Bearer <token>',
        in: 'header',
        name: 'Authorization',
      },
      'bearer',
    )
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  })

  await app.listen(port)
  console.log(`Swagger docs: http://localhost:${port}/docs`)

}

bootstrap()
