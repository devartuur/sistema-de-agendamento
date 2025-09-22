import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateCustomerUseCase } from 'src/domain/application/use-cases/customer/create-customer.use-case/create-customer.use-case'
import { Public } from 'src/infra/auth/public'

class CreateCustomerBodyDTO {
  name: string
  email: string
  password: string
  birthDateAt: Date
}

@ApiTags('Customers')
@Controller('/api/v1/customers')
export class CreateCustomerController {
  constructor(private createCustomer: CreateCustomerUseCase) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create customer' })
  @ApiResponse({ status: 201, description: 'Customer created' })
  async handle(@Body() body: CreateCustomerBodyDTO) {
    const result = await this.createCustomer.execute(body)

    if (result.isLeft()) {
      const error = result.value
      throw new BadRequestException(error)
    }
  }
}
