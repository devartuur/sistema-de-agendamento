import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateHourUseCase } from 'src/domain/application/use-cases/hour/create-hour.use-case/create-hour.use-case'
import { createZodDto } from 'nestjs-zod'
import z from 'zod'

export const createHourSchema = z.object({
  hour: z.number(),
  day: z.array(z.number()),
})

export type CreateHourType = z.infer<typeof createHourSchema>

class CreateHourDto extends createZodDto(createHourSchema) {}

@ApiTags('Hours')
@Controller('/api/v1/hours')
export class CreateHourController {
  constructor(private createHour: CreateHourUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create hour slot' })
  @ApiResponse({ status: 201, description: 'Hour created' })
  @ApiBody({ type: CreateHourDto })
  async handle(@Body() body: CreateHourType) {
    const result = await this.createHour.execute(body)

    if (result.isLeft()) {
      const error = result.value
      throw new BadRequestException(error)
    }
  }
}
