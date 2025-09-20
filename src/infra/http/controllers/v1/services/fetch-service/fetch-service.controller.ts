import { BadRequestException, Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FetchServiceUseCase } from 'src/domain/application/use-cases/service/fetch-service.use-case/fetch-service.use-case'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found.error'
import { ServicePresenter } from '../../../presenters/service/service.presenter'

@ApiTags('Services')
@Controller('/api/v1/services/:id')
export class FetchServiceController {
  constructor(private fetchService: FetchServiceUseCase) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch service by id' })
  async handle(@Param('id') id: string) {
    const result = await this.fetchService.execute({ serviceId: id })

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
