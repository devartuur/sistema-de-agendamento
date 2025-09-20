import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateSchedullingUseCase } from 'src/domain/application/use-cases/schedulling/create-schedulling.use-case/create-schedulling.use-case'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found.error'
import { HourIsNotAvailableError } from 'src/domain/application/use-cases/@errors/hour-not-is-not-available.error'
import { HourMustBeInSequenceError } from 'src/domain/application/use-cases/@errors/hours-must-be-in-sequence.error'
import { SchedullingPresenter } from '../../../presenters/schedulling/schedulling.presenter'

class CreateSchedullingBodyDTO {
  customerId: string
  collaboratorId: string
  serviceId: string
  date: string
  hourId: string
}

@ApiTags('Schedullings')
@Controller('/api/v1/schedullings')
export class CreateSchedullingController {
  constructor(private createSchedulling: CreateSchedullingUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create schedulling' })
  @ApiResponse({ status: 201, description: 'Schedulling created' })
  async handle(@Body() body: CreateSchedullingBodyDTO) {
    const { customerId, collaboratorId, date, hourId, serviceId } = body

    const parsedDate = new Date(date)
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid date format. Use ISO string.')
    }

    const result = await this.createSchedulling.execute({
      customerId,
      collaboratorId,
      date: parsedDate,
      hourId,
      serviceId,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ResourceNotFoundError:
          // Propagar como 400 para manter padrão simples ou adaptar para 404 em endpoints específicos
          throw new BadRequestException(error)
        case HourIsNotAvailableError:
        case HourMustBeInSequenceError:
          throw new BadRequestException(error)
        default:
          throw new BadRequestException(error)
      }
    }

    return SchedullingPresenter.toHttp(result.value.schedulling)
  }
}
