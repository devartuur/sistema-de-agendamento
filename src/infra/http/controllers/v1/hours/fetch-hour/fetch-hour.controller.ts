import { BadRequestException, Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FetchHourUseCase } from 'src/domain/application/use-cases/hour/fetch-hour.use-case/fetch-hour.use-case'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found.error'
import { HourPresenter } from '../../../presenters/hour/hour.presenter'

@ApiTags('Hours')
@Controller('/api/v1/hours/:id')
export class FetchHourController {
  constructor(private fetchHour: FetchHourUseCase) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch hour by id' })
  async handle(@Param('id') id: string) {
    const result = await this.fetchHour.execute({ hourId: id })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error)
      }
    }

    return HourPresenter.toHttp(result.value.hour)
  }
}
