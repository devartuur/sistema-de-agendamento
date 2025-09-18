import { InMemoryCustomersRepository } from "test/repositories/in-memory-customers-repository"
import { CollaboratorsRepository } from "../../../repositories/collaborators-repository"
import { CustomersRepository } from "../../../repositories/customers-repository"
import { HoursRepository } from "../../../repositories/hours-repository"
import { SchedullingsRepository } from "../../../repositories/schedullings-repository"
import { ServicesRepository } from "../../../repositories/service-repository"
import { CreateSchedullingUseCase } from "./create-schedulling.use-case"
import { InMemoryServicesRepository } from "test/repositories/in-memory-services-repository"
import { InMemoryCollaboratorsRepository } from "test/repositories/in-memory-collaborators-repository"
import { InMemoryHoursRepository } from "test/repositories/in-memory-hours-repository"
import { InMemorySchedullingsRepository } from "test/repositories/in-memory-schedullings-repository"
import { makeCustomer } from "test/factories/make-customer"
import { makeHour } from "test/factories/make-hours"
import { makeCollaborator } from "test/factories/make-collaborator"
import { makeService } from "test/factories/make-service"
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found.error"
import { makeSchedulling } from "test/factories/make-schedulling"
import { HourIsNotAvailableError } from "../../@errors/hour-not-is-not-available.error"
import { HourMustBeInSequenceError } from "../../@errors/hours-must-be-in-sequence.error"

let sut: CreateSchedullingUseCase
let customersRepository: CustomersRepository
let servicesRepository: ServicesRepository
let collaboratorsRepository: CollaboratorsRepository
let hoursRepository: HoursRepository
let schedullingsRepository: SchedullingsRepository

describe("[Create Schedulling]", () => {

  beforeEach(() => {
    customersRepository = new InMemoryCustomersRepository(),
    servicesRepository = new InMemoryServicesRepository(),
    collaboratorsRepository = new InMemoryCollaboratorsRepository(),
    schedullingsRepository = new InMemorySchedullingsRepository(),
    hoursRepository = new InMemoryHoursRepository(schedullingsRepository)

    sut = new CreateSchedullingUseCase(
      schedullingsRepository,
      customersRepository,
      collaboratorsRepository,
      servicesRepository,
      hoursRepository
    )
  })


  it("should be possible to create a schedule", async () => {
    const customer = makeCustomer()
    await customersRepository.create(customer)

    const hour1 = makeHour({day: [1, 2, 3, 4, 5, 6, 7], hour: 480})
    await hoursRepository.create(hour1)

    const service = makeService({duration: 20, })
    await servicesRepository.create(service)

    const collaborator = makeCollaborator({serviceIds: [service.id]})
    await collaboratorsRepository.create(collaborator)

    const result = await sut.execute({
      collaboratorId: collaborator.id.toString(),
      customerId: customer.id.toString(),
      date: new Date('2025-09-18'),
      hourId: hour1.id.toString(),
      serviceId: service.id.toString()
    })

    expect(result.isRight())
  })

  it("It should not be possible to create a schedule with a non-existing time slot", async () => {
    const customer = makeCustomer()
    await customersRepository.create(customer)

    // const hour1 = makeHour({day: [1, 2, 3, 4, 5, 6, 7], hour: 480})
    // await hoursRepository.create(hour1)

    const service = makeService({duration: 20, })
    await servicesRepository.create(service)

    const collaborator = makeCollaborator({serviceIds: [service.id]})
    await collaboratorsRepository.create(collaborator)


    const result = await sut.execute({
      collaboratorId: collaborator.id.toString(),
      customerId: customer.id.toString(),
      date: new Date('2025-09-18'),
      hourId: 'non-existent',
      serviceId: service.id.toString()
    })

    expect(result.isLeft())
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it("It should not be possible to create an appointment if the time is not available", async () => {
    const customer = makeCustomer()
    await customersRepository.create(customer)

    const hour1 = makeHour({day: [1, 2, 3, 4, 5, 6, 7], hour: 480})
    const hour2 = makeHour({day: [1, 2, 3, 4, 5, 6, 7], hour: 500})
    await hoursRepository.create(hour1)
    await hoursRepository.create(hour2)

    const service = makeService({duration: 20, })
    await servicesRepository.create(service)

    const collaborator = makeCollaborator({serviceIds: [service.id]})
    await collaboratorsRepository.create(collaborator)

    const date = new Date()

    const schedule = makeSchedulling({
      collaboratorId: collaborator.id, 
      customerId: customer.id, 
      hoursIds: [hour2.id],
      date
    })

    await schedullingsRepository.create(schedule)

    const result = await sut.execute({
      collaboratorId: collaborator.id.toString(),
      customerId: customer.id.toString(),
      date,
      hourId: hour2.id.toString(),
      serviceId: service.id.toString()
    })

    expect(result.isLeft())
    expect(result.value).toBeInstanceOf(HourIsNotAvailableError)
  })

  it("should not be possible to create a schedule with a non-existing collaborator", async () => {
    const customer = makeCustomer()
    await customersRepository.create(customer)

    const hour1 = makeHour({ day: [1, 2, 3, 4, 5, 6, 7], hour: 480 })
    await hoursRepository.create(hour1)

    const service = makeService({ duration: 20 })
    await servicesRepository.create(service)

    const result = await sut.execute({
      collaboratorId: "non-existent",
      customerId: customer.id.toString(),
      date: new Date('2025-09-18'),
      hourId: hour1.id.toString(),
      serviceId: service.id.toString()
    })

    expect(result.isLeft())
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it("should not be possible to create a schedule with a non-existing customer", async () => {
    const hour1 = makeHour({ day: [1, 2, 3, 4, 5, 6, 7], hour: 480 })
    await hoursRepository.create(hour1)

    const service = makeService({ duration: 20 })
    await servicesRepository.create(service)

    const collaborator = makeCollaborator({ serviceIds: [service.id] })
    await collaboratorsRepository.create(collaborator)

    const result = await sut.execute({
      collaboratorId: collaborator.id.toString(),
      customerId: "non-existent",
      date: new Date('2025-09-18'),
      hourId: hour1.id.toString(),
      serviceId: service.id.toString()
    })

    expect(result.isLeft())
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })


  it("should not be possible to create a schedule with a non-existing service", async () => {
    const customer = makeCustomer()
    await customersRepository.create(customer)

    const hour1 = makeHour({ day: [1, 2, 3, 4, 5, 6, 7], hour: 480 })
    await hoursRepository.create(hour1)

    const collaborator = makeCollaborator({ serviceIds: [] })
    await collaboratorsRepository.create(collaborator)

    const result = await sut.execute({
      collaboratorId: collaborator.id.toString(),
      customerId: customer.id.toString(),
      date: new Date('2025-09-18'),
      hourId: hour1.id.toString(),
      serviceId: "non-existent"
    })

    expect(result.isLeft())
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })


  it("should not be possible to create a schedule with multiple hours not in sequence", async () => {
    const customer = makeCustomer()
    await customersRepository.create(customer)

    const hour1 = makeHour({ day: [1,2,3,4,5,6,7], hour: 480 }) // 8:00
    const hour2 = makeHour({ day: [1,2,3,4,5,6,7], hour: 520 }) // 8:40, not consecutive
    await hoursRepository.create(hour1)
    await hoursRepository.create(hour2)

    const service = makeService({ duration: 40 }) // needs 2 blocks of 20min
    await servicesRepository.create(service)

    const collaborator = makeCollaborator({ serviceIds: [service.id] })
    await collaboratorsRepository.create(collaborator)

    const result = await sut.execute({
      collaboratorId: collaborator.id.toString(),
      customerId: customer.id.toString(),
      date: new Date('2025-09-18'),
      hourId: hour1.id.toString(),
      serviceId: service.id.toString()
    })

    expect(result.isLeft())
    expect(result.value).toBeInstanceOf(HourMustBeInSequenceError)
  })

})