import { Injectable } from "@nestjs/common";
import { SchedullingsRepository } from "../../repositories/schedullings-repository";
import { CustomersRepository } from "../../repositories/customers-repository";
import { left } from "src/core/utils/either";
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found.error";
import { collaboratorsRepository } from "../../repositories/collaborators-repository";
import { Schedulling } from "src/domain/enterprise/entities/schedulling";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { HoursRepository } from "../../repositories/hours-repository";
import { ServicesRepository } from "../../repositories/service-repository";
import { Hour } from "src/domain/enterprise/entities/hours";

export interface CreateSchedullingUseCaseRequest {
  customerId: string
  collaboratorId: string
  serviceId: string
  date: Date
  hourId: string
}

@Injectable()
export class CreateSchedullingUseCase {
  constructor(
    private schedullingsRepository: SchedullingsRepository,
    private customersRepository: CustomersRepository,
    private collaboratorsRepository: collaboratorsRepository,
    private servicesRepository: ServicesRepository,
    private hoursRepository: HoursRepository
  ) {}

  async execute({ 
    collaboratorId, 
    customerId, 
    date, 
    hourId, 
    serviceId }: CreateSchedullingUseCaseRequest) {
      const customer = await this.customersRepository.findById(customerId) 
      if(!customer) return left(new ResourceNotFoundError('Customer'))

      const service = await this.servicesRepository.findById(serviceId)
      if(!service) return left(new ResourceNotFoundError('Service'))
      
      const collaborator = await this.collaboratorsRepository.findById(collaboratorId)
      if(!collaborator) return left(new ResourceNotFoundError('Collaborator'))

      const hour = await this.hoursRepository.findById(hourId)
      if(!hour) return left(new ResourceNotFoundError('Hour'))

      const freTimeSlots = 
        await this.hoursRepository.findFreByDateAndCollaboratorId(date, collaboratorId)
      
      if(!freTimeSlots.includes(hour)) throw new Error("horario não está disponivel")

      const slots = service.duration / 20

      const initialIndex = freTimeSlots.findIndex((item) => item.id.toString() === hour.id.toString())

      const freTimeSlotsSpliced = freTimeSlots.splice(initialIndex)

      const slotsRequired: Hour[] = []

      for(let i = 0; i < slots; i++) {
        slotsRequired.push(freTimeSlotsSpliced[i])
      }

      const schedulling = Schedulling.create({
        collaboratorId: new UniqueEntityID(collaboratorId),
        customerId: new UniqueEntityID(customerId),
        hoursIds: slotsRequired.map((item) => item.id),
        schedullingDate: date
      })

      await this.schedullingsRepository.create(schedulling)

  }
}