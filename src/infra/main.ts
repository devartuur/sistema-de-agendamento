import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'
import { patchNestJsSwagger } from 'nestjs-zod'
import * as bodyParser from 'body-parser'
import { Debug } from '@/core/utils/logger/logger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug'],
  })

  app.use(bodyParser.json({ limit: '10mb' }))
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

  patchNestJsSwagger()

  app.enableCors()

  const envService = app.get(EnvService)
  const port = envService.get('PORT')
  const isDevelopment = envService.get('NODE_ENV') === 'development'

  const config = new DocumentBuilder()
    .setTitle('API Biblets')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  if (isDevelopment) {
    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    })
  }

  await app.listen(port)

  Debug.line()
  Debug.green(`🚀 Application is running on port ${port}`)

  Debug.line()
  Debug.white(`🌐 URL: http://localhost:${port}`)

  if (isDevelopment) {
    Debug.white(`📚 Documentation: http://localhost:${port}/docs`)
  }
}

bootstrap()
