import { BadRequestException, Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FetchSchedullingUseCase } from 'src/domain/application/use-cases/schedulling/fetch-schedulling/fetch-schedulling.use-case'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found.error'
import { SchedullingPresenter } from '../../../presenters/schedulling/schedulling.presenter'

@ApiTags('Schedullings')
@Controller('/api/v1/schedullings/:id')
export class FetchSchedullingController {
  constructor(private fetchSchedulling: FetchSchedullingUseCase) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch schedulling by id' })
  async handle(@Param('id') id: string) {
    const result = await this.fetchSchedulling.execute({ schedullingId: id })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error)
      }
    }

    return SchedullingPresenter.toHttp(result.value.schedulling)
  }
}
