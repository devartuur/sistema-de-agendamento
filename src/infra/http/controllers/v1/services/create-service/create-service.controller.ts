import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateServiceUseCase } from 'src/domain/application/use-cases/service/create-service.use-case/create-service.use-case'

class CreateServiceBodyDTO {
  name: string
  description: string
  duration: number
  price: number
}

@ApiTags('Services')
@Controller('/api/v1/services')
export class CreateServiceController {
  constructor(private createService: CreateServiceUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create service' })
  @ApiResponse({ status: 201, description: 'Service created' })
  async handle(@Body() body: CreateServiceBodyDTO) {
    const result = await this.createService.execute(body)

    if (result.isLeft()) {
      const error = result.value
      throw new BadRequestException(error)
    }
  }
}
