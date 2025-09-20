import { Module } from '@nestjs/common'

import { CreateServiceUseCase } from 'src/domain/application/use-cases/service/create-service.use-case/create-service.use-case'
import { FetchServiceUseCase } from 'src/domain/application/use-cases/service/fetch-service.use-case/fetch-service.use-case'
import { CreateServiceController } from './create-service/create-service.controller'
import { FetchServiceController } from './fetch-service/fetch-service.controller'
import { DatabaseModule } from 'src/infra/database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateServiceController, FetchServiceController],
  providers: [CreateServiceUseCase, FetchServiceUseCase],
})
export class ServicesModule {}
