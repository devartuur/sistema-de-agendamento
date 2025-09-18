import { InMemoryHoursRepository } from "test/repositories/in-memory-hours-repository"
import { InMemorySchedullingsRepository } from "test/repositories/in-memory-schedullings-repository"
import { HoursRepository } from "src/domain/application/repositories/hours-repository"
import { SchedullingsRepository } from "src/domain/application/repositories/schedullings-repository"
import { FetchHourUseCase } from "./fetch-hour.use-case"
import { makeHour } from "test/factories/make-hours"
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found.error"

let sut: FetchHourUseCase
let hoursRepository: HoursRepository
let schedullingsRepository: SchedullingsRepository

describe('[FetchHourUseCase]', () => {
  beforeEach(() => {
    schedullingsRepository = new InMemorySchedullingsRepository()
    hoursRepository = new InMemoryHoursRepository(schedullingsRepository)
    sut = new FetchHourUseCase(hoursRepository)
  })

  it('should fetch an existing hour successfully', async () => {
    const hour = makeHour({ hour: 480, day: [1,2,3,4,5] })
    await hoursRepository.create(hour)

    const result = await sut.execute({ hourId: hour.id.toString() })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.hour).toEqual(hour)
    }
  })

  it('should return ResourceNotFoundError if hour does not exist', async () => {
    const result = await sut.execute({ hourId: 'non-existent-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
