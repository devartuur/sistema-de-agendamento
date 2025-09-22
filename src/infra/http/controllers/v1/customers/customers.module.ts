import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/infra/database/database.module'
import { CreateCustomerUseCase } from 'src/domain/application/use-cases/customer/create-customer.use-case/create-customer.use-case'
import { EditProfileUseCase } from 'src/domain/application/use-cases/customer/edit-profile.use-case/edit-profile.use-case'
import { CreateCustomerController } from './create-customer/create-customer.controller'
import { EditProfileController } from './edit-profile/edit-profile.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateCustomerController, EditProfileController],
  providers: [CreateCustomerUseCase, EditProfileUseCase],
})
export class CustomersModule {}
