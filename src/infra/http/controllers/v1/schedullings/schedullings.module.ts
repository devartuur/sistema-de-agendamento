import { Module } from '@nestjs/common'

import { CreateSchedullingUseCase } from 'src/domain/application/use-cases/schedulling/create-schedulling.use-case/create-schedulling.use-case'
import { FetchSchedullingUseCase } from 'src/domain/application/use-cases/schedulling/fetch-schedulling/fetch-schedulling.use-case'
import { CreateSchedullingController } from './create-schedulling/create-schedulling.controller'
import { FetchSchedullingController } from './fetch-schedulling/fetch-schedulling.controller'
import { DatabaseModule } from 'src/infra/database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateSchedullingController, FetchSchedullingController],
  providers: [CreateSchedullingUseCase, FetchSchedullingUseCase],
})
export class SchedullingsModule {}
