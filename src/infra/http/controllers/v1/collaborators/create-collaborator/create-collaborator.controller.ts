import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateCollaboratorUseCase } from 'src/domain/application/use-cases/collaborator/create-collaborator.use-case/create-collaborator.use-case'

class CreateCollaboratorBodyDTO {
  name: string
  description: string
  serviceIds: string[]
}

@ApiTags('Collaborators')
@Controller('/api/v1/collaborators')
export class CreateCollaboratorController {
  constructor(private createCollaborator: CreateCollaboratorUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create collaborator' })
  @ApiResponse({ status: 201, description: 'Collaborator created' })
  async handle(@Body() body: CreateCollaboratorBodyDTO) {
    const result = await this.createCollaborator.execute(body)

    if (result.isLeft()) {
      const error = result.value
      throw new BadRequestException(error)
    }
  }
}
