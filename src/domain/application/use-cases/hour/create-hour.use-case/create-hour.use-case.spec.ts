import { InMemoryHoursRepository } from "test/repositories/in-memory-hours-repository"
import { InMemorySchedullingsRepository } from "test/repositories/in-memory-schedullings-repository"
import { HoursRepository } from "src/domain/application/repositories/hours-repository"
import { SchedullingsRepository } from "src/domain/application/repositories/schedullings-repository"
import { CreateHourUseCase } from "./create-hour.use-case"

let sut: CreateHourUseCase
let hoursRepository: HoursRepository
let schedullingsRepository: SchedullingsRepository

describe('[CreateHourUseCase]', () => {
  beforeEach(() => {
    schedullingsRepository = new InMemorySchedullingsRepository()
    hoursRepository = new InMemoryHoursRepository(schedullingsRepository)
    sut = new CreateHourUseCase(hoursRepository)
  })

  it('should create an hour successfully', async () => {
    const result = await sut.execute({
      hour: 480, // 08:00 in minutes
      day: [1, 2, 3, 4, 5],
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.hour.hour).toBe(480)
      expect(result.value.hour.createdAt).toBeInstanceOf(Date)
    }
  })
})
