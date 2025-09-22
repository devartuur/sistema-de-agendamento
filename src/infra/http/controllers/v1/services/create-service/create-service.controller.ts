import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateServiceUseCase } from 'src/domain/application/use-cases/service/create-service.use-case/create-service.use-case'
import { createZodDto } from 'nestjs-zod'
import z from 'zod'

export const createServiceSchema = z.object({
  name: z.string(),
  description: z.string(),
  duration: z.number(),
  price: z.number(),
})

export type CreateServiceType = z.infer<typeof createServiceSchema>

class CreateServiceDto extends createZodDto(createServiceSchema) {}

@ApiTags('Services')
@Controller('/api/v1/services')
export class CreateServiceController {
  constructor(private createService: CreateServiceUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create service' })
  @ApiResponse({ status: 201, description: 'Service created' })
  @ApiBody({ type: CreateServiceDto })
  async handle(@Body() body: CreateServiceType) {
    const result = await this.createService.execute(body)

    if (result.isLeft()) {
      const error = result.value
      throw new BadRequestException(error)
    }
  }
}
