import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateCollaboratorUseCase } from 'src/domain/application/use-cases/collaborator/create-collaborator.use-case/create-collaborator.use-case'
import { createZodDto } from 'nestjs-zod'
import z from 'zod'

export const createCollaboratorSchema = z.object({
  name: z.string(),
  description: z.string(),
  serviceIds: z.array(z.string()),
})

export type CreateCollaboratorType = z.infer<typeof createCollaboratorSchema>

class CreateCollaboratorDto extends createZodDto(createCollaboratorSchema) {}

@ApiTags('Collaborators')
@Controller('/api/v1/collaborators')
export class CreateCollaboratorController {
  constructor(private createCollaborator: CreateCollaboratorUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create collaborator' })
  @ApiResponse({ status: 201, description: 'Collaborator created' })
  @ApiBody({ type: CreateCollaboratorDto })
  async handle(@Body() body: CreateCollaboratorType) {
    const result = await this.createCollaborator.execute(body)

    if (result.isLeft()) {
      const error = result.value
      throw new BadRequestException(error)
    }
  }
}

