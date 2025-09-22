import { BadRequestException, Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FetchServiceUseCase } from 'src/domain/application/use-cases/service/fetch-service.use-case/fetch-service.use-case'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found.error'
import { ServicePresenter } from '../../../presenters/service/service.presenter'
import { createZodDto } from 'nestjs-zod'
import z from 'zod'

export const fetchServiceParamsSchema = z.object({
  id: z.string(),
})

export type FetchServiceParamsType = z.infer<typeof fetchServiceParamsSchema>

class FetchServiceParamsDto extends createZodDto(fetchServiceParamsSchema) {}

@ApiTags('Services')
@Controller('/api/v1/services/:id')
export class FetchServiceController {
  constructor(private fetchService: FetchServiceUseCase) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch service by id' })
  async handle(@Param() params: FetchServiceParamsType) {
    const result = await this.fetchService.execute({ serviceId: params.id })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error)
      }
    }

    return ServicePresenter.toHttp(result.value.service)
  }
}

