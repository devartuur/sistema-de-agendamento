import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { CreateCustomerUseCase } from 'src/domain/application/use-cases/customer/create-customer.use-case/create-customer.use-case'
import { Public } from 'src/infra/auth/public'
import { z } from 'zod'

export const createCustomerSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  birthDateAt: z.coerce.date()
})

export type CreateCustomerType = z.infer<typeof createCustomerSchema>

class CreateCustomerDto extends createZodDto(createCustomerSchema) {}

@ApiTags('Customers')
@Controller('/api/v1/customers')
export class CreateCustomerController {
  constructor(private createCustomer: CreateCustomerUseCase) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create customer' })
  @ApiBody({type: CreateCustomerDto})
  @ApiResponse({ status: 201, description: 'Customer created' })
  async handle(@Body() body: CreateCustomerType) {

    const { birthDateAt, email, name, password } = body

    const result = await this.createCustomer.execute({
      birthDateAt,
      email,
      name,
      password
    })

    if (result.isLeft()) {
      const error = result.value
      throw new BadRequestException(error)
    }
  }
}
