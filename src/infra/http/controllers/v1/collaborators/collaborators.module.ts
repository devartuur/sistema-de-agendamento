import { Module } from '@nestjs/common'

import { CreateCollaboratorUseCase } from 'src/domain/application/use-cases/collaborator/create-collaborator.use-case/create-collaborator.use-case'
import { FetchCollaboratorUseCase } from 'src/domain/application/use-cases/collaborator/fetch-collaborator.use-case/fetch-collaborator.use-case'
import { CreateCollaboratorController } from './create-collaborator/create-collaborator.controller'
import { FetchCollaboratorController } from './fetch-collaborator/fetch-collaborator.controller'
import { DatabaseModule } from 'src/infra/database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateCollaboratorController, FetchCollaboratorController],
  providers: [CreateCollaboratorUseCase, FetchCollaboratorUseCase],
})
export class CollaboratorsModule {}
