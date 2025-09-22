import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Patch, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { EditProfileUseCase } from 'src/domain/application/use-cases/customer/edit-profile.use-case/edit-profile.use-case'
import { createZodDto } from 'nestjs-zod'
import z from 'zod'

export const editProfileSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  birthDateAt: z.coerce.date().optional(),
})

export type EditProfileType = z.infer<typeof editProfileSchema>

class EditProfileDto extends createZodDto(editProfileSchema) {}

@ApiTags('Customers')
@Controller('/api/v1/customers')
export class EditProfileController {
  constructor(private editProfile: EditProfileUseCase) {}

  @Patch('/profile')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Edit customer profile (authenticated)' })
  @ApiResponse({ status: 204, description: 'Profile updated' })
  @ApiBody({ type: EditProfileDto })
  async handle(@Body() body: EditProfileType, @Req() req: any) {
    const customerId: string = req.user.sub

    const result = await this.editProfile.execute({ customerId, ...body })

    if (result.isLeft()) {
      const error = result.value
      throw new BadRequestException(error)
    }
  }
}

