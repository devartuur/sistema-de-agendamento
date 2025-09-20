import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FetchFreeHoursUseCase } from 'src/domain/application/use-cases/hour/fetch-free-hours.use-case/fetch-free-hours.use-case'
import { HourPresenter } from '../../../presenters/hour/hour.presenter'

@ApiTags('Hours')
@Controller('/api/v1/hours/free')
export class FetchFreeHoursController {
  constructor(private fetchFreeHours: FetchFreeHoursUseCase) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch free hours by date and collaborator' })
  async handle(
    @Query('date') dateIso: string,
    @Query('collaboratorId') collaboratorId: string,
  ) {
    const date = new Date(dateIso)
    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date format. Use ISO string.')
    }

    const result = await this.fetchFreeHours.execute({ date, collaboratorId })

    if (result.isLeft()) {
      const error = result.value
      throw new BadRequestException(error)
    }

    return result.value.hours.map((h) => HourPresenter.toHttp(h))
  }
}
