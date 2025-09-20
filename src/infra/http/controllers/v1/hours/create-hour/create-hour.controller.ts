import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateHourUseCase } from 'src/domain/application/use-cases/hour/create-hour.use-case/create-hour.use-case'

class CreateHourBodyDTO {
  hour: number
  day: number[]
}

@ApiTags('Hours')
@Controller('/api/v1/hours')
export class CreateHourController {
  constructor(private createHour: CreateHourUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create hour slot' })
  @ApiResponse({ status: 201, description: 'Hour created' })
  async handle(@Body() body: CreateHourBodyDTO) {
    const result = await this.createHour.execute(body)

    if (result.isLeft()) {
      const error = result.value
      throw new BadRequestException(error)
    }
  }
}
