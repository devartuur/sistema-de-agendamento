import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateSchedullingUseCase } from 'src/domain/application/use-cases/schedulling/create-schedulling.use-case/create-schedulling.use-case'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found.error'
import { HourIsNotAvailableError } from 'src/domain/application/use-cases/@errors/hour-not-is-not-available.error'
import { HourMustBeInSequenceError } from 'src/domain/application/use-cases/@errors/hours-must-be-in-sequence.error'
import { SchedullingPresenter } from '../../../presenters/schedulling/schedulling.presenter'
import { createZodDto } from 'nestjs-zod'
import z from 'zod'

export const createSchedullingSchema = z.object({
  customerId: z.string(),
  collaboratorId: z.string(),
  serviceId: z.string(),
  date: z.coerce.date(),
  hourId: z.string(),
})

export type CreateSchedullingType = z.infer<typeof createSchedullingSchema>

class CreateSchedullingDto extends createZodDto(createSchedullingSchema) {}

@ApiTags('Schedullings')
@Controller('/api/v1/schedullings')
export class CreateSchedullingController {
  constructor(private createSchedulling: CreateSchedullingUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create schedulling' })
  @ApiResponse({ status: 201, description: 'Schedulling created' })
  @ApiBody({ type: CreateSchedullingDto })
  async handle(@Body() body: CreateSchedullingType) {
    const { customerId, collaboratorId, date, hourId, serviceId } = body

    const result = await this.createSchedulling.execute({
      customerId,
      collaboratorId,
      date,
      hourId,
      serviceId,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ResourceNotFoundError:
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

