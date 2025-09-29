import { Injectable } from "@nestjs/common";
import { SchedullingsRepository } from "../../../repositories/schedullings-repository";
import { CustomersRepository } from "../../../repositories/customers-repository";
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found.error";
import { CollaboratorsRepository } from "../../../repositories/collaborators-repository";
import { Schedulling } from "src/domain/enterprise/entities/schedulling";
import { HoursRepository } from "../../../repositories/hours-repository";
import { ServicesRepository } from "../../../repositories/service-repository";
import { Hour } from "src/domain/enterprise/entities/hours";
import { HourIsNotAvailableError } from "../../@errors/hour-not-is-not-available.error";
import { HourMustBeInSequenceError } from "../../@errors/hours-must-be-in-sequence.error";
import { HourNotAvailableOnDayError } from "../../@errors/hour-not-available-on-day.error";
import { Either, left, right } from "src/core/utils/either";

export interface CreateSchedullingUseCaseRequest {
  customerId: string
  collaboratorId: string
  serviceId: string
  date: Date
  hourId: string
}

export type CreateSchedullingUseCaseResponse = Either<
  ResourceNotFoundError | 
  HourIsNotAvailableError | 
  HourMustBeInSequenceError |
  HourNotAvailableOnDayError, 
  {
    schedulling: Schedulling
  }

>

@Injectable()
export class CreateSchedullingUseCase {
  constructor(
    private schedullingsRepository: SchedullingsRepository,
    private customersRepository: CustomersRepository,
    private collaboratorsRepository: CollaboratorsRepository,
    private servicesRepository: ServicesRepository,
    private hoursRepository: HoursRepository
  ) {}

  async execute({ 
    collaboratorId, 
    customerId, 
    date, 
    hourId, 
    serviceId }: CreateSchedullingUseCaseRequest): Promise<CreateSchedullingUseCaseResponse> {
      const customer = await this.customersRepository.findById(customerId) 
      if(!customer) return left(new ResourceNotFoundError('Customer'))

      const service = await this.servicesRepository.findById(serviceId)
      if(!service) return left(new ResourceNotFoundError('Service'))
      
      const collaborator = await this.collaboratorsRepository.findById(collaboratorId)
      if(!collaborator) return left(new ResourceNotFoundError('Collaborator'))

      const hour = await this.hoursRepository.findById(hourId)
      if(!hour) return left(new ResourceNotFoundError('Hour'))

      
      const dayOfSchedulling = date.getDay()
      if(!hour.days.includes(dayOfSchedulling)) return left(new HourNotAvailableOnDayError())


      const availableHoursSlots = 
        await this.hoursRepository.findFreeByDateAndCollaboratorId(date, collaboratorId)
      
      const includesHourIdInFreeHours = availableHoursSlots.find((item) => item.id.toString() === hourId)
      if(includesHourIdInFreeHours === undefined) return left(new HourIsNotAvailableError())

      const minutesDurationHour = 20 // 20 minutes

      const numberHourServiceNecessary = service.duration / minutesDurationHour

      const initialIndex = availableHoursSlots.findIndex((item) => item.id.toString() === hour.id.toString())

      const availableHoursSlotsFirtsCorrespondence = availableHoursSlots.splice(initialIndex)

      const hoursRequired: Hour[] = []

      
      for(let i = 0; i < numberHourServiceNecessary; i++) {
        hoursRequired.push(availableHoursSlotsFirtsCorrespondence[i])
      }

      if(hoursRequired.length > 1) {
        for(let i = 0; i < hoursRequired.length; i++) {
          const oneMore = i + 1
          if((hoursRequired[i].hour + minutesDurationHour) !== hoursRequired[oneMore].hour) {
            return left(new HourMustBeInSequenceError())
          }
        }
    }

      const schedulling = Schedulling.create({
        collaboratorId: collaborator.id,
        customerId: customer.id,
        hoursIds: hoursRequired.map((item) => item.id),
        date
      })

      await this.schedullingsRepository.create(schedulling)

      return right({
        schedulling
      })
  }
}

