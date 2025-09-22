import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Patch, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { EditProfileUseCase } from 'src/domain/application/use-cases/customer/edit-profile.use-case/edit-profile.use-case'

class EditProfileBodyDTO {
  name?: string
  email?: string
  password?: string
  birthDateAt?: Date
}

@ApiTags('Customers')
@Controller('/api/v1/customers')
export class EditProfileController {
  constructor(private editProfile: EditProfileUseCase) {}

  @Patch('/profile')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit customer profile (authenticated)' })
  @ApiResponse({ status: 204, description: 'Profile updated' })
  async handle(@Body() body: EditProfileBodyDTO, @Req() req: any) {
    const customerId: string = req.user.sub

    const result = await this.editProfile.execute({ customerId, ...body })

    if (result.isLeft()) {
      const error = result.value
      throw new BadRequestException(error)
    }
  }
}
