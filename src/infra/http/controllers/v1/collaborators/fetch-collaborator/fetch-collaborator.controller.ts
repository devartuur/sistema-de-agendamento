import { BadRequestException, Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FetchCollaboratorUseCase } from 'src/domain/application/use-cases/collaborator/fetch-collaborator.use-case/fetch-collaborator.use-case'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found.error'
import { CollaboratorPresenter } from '../../../presenters/collaborator/collaborator.presenter'

@ApiTags('Collaborators')
@Controller('/api/v1/collaborators/:id')
export class FetchCollaboratorController {
  constructor(private fetchCollaborator: FetchCollaboratorUseCase) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch collaborator by id' })
  async handle(@Param('id') id: string) {
    const result = await this.fetchCollaborator.execute({ collaboratorId: id })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error)
      }
    }

    return CollaboratorPresenter.toHttp(result.value.collaborator)
  }
}
