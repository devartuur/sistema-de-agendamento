import { Module } from '@nestjs/common'

import { CreateHourUseCase } from 'src/domain/application/use-cases/hour/create-hour.use-case/create-hour.use-case'
import { FetchHourUseCase } from 'src/domain/application/use-cases/hour/fetch-hour.use-case/fetch-hour.use-case'
import { FetchFreeHoursUseCase } from 'src/domain/application/use-cases/hour/fetch-free-hours.use-case/fetch-free-hours.use-case'
import { CreateHourController } from './create-hour/create-hour.controller'
import { FetchHourController } from './fetch-hour/fetch-hour.controller'
import { FetchFreeHoursController } from './fetch-free-hours/fetch-free-hours.controller'
import { DatabaseModule } from 'src/infra/database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateHourController, FetchHourController, FetchFreeHoursController],
  providers: [CreateHourUseCase, FetchHourUseCase, FetchFreeHoursUseCase],
})
export class HoursModule {}
