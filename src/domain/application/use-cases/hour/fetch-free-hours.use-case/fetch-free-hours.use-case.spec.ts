import { InMemoryHoursRepository } from "test/repositories/in-memory-hours-repository"
import { InMemorySchedullingsRepository } from "test/repositories/in-memory-schedullings-repository"
import { HoursRepository } from "src/domain/application/repositories/hours-repository"
import { SchedullingsRepository } from "src/domain/application/repositories/schedullings-repository"
import { FetchFreeHoursUseCase } from "./fetch-free-hours.use-case"
import { makeHour } from "test/factories/make-hours"
import { makeSchedulling } from "test/factories/make-schedulling"

let sut: FetchFreeHoursUseCase
let hoursRepository: HoursRepository
let schedullingsRepository: SchedullingsRepository

describe('[FetchFreeHoursUseCase]', () => {
  beforeEach(() => {
    schedullingsRepository = new InMemorySchedullingsRepository()
    hoursRepository = new InMemoryHoursRepository(schedullingsRepository)
    sut = new FetchFreeHoursUseCase(hoursRepository)
  })

  it('should return all hours when there are no bookings', async () => {
    const hour1 = makeHour({ hour: 480, day: [1,2,3,4,5] })
    const hour2 = makeHour({ hour: 500, day: [1,2,3,4,5] })
    await hoursRepository.create(hour1)
    await hoursRepository.create(hour2)

    const date = new Date('2025-09-18')
    const result = await sut.execute({ date, collaboratorId: 'collab-1' })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.hours.map((h) => h.id.toString())).toEqual([
        hour1.id.toString(),
        hour2.id.toString(),
      ])
    }
  })

  it('should return only free hours when some are booked', async () => {
    const hour1 = makeHour({ hour: 480, day: [1,2,3,4,5] })
    const hour2 = makeHour({ hour: 500, day: [1,2,3,4,5] })
    const hour3 = makeHour({ hour: 520, day: [1,2,3,4,5] })
    await hoursRepository.create(hour1)
    await hoursRepository.create(hour2)
    await hoursRepository.create(hour3)

    const date = new Date('2025-09-18')

    const schedulling = makeSchedulling({
      collaboratorId: { toString: () => 'collab-1' } as any,
      hoursIds: [hour2.id],
      date,
    })
    await schedullingsRepository.create(schedulling)

    const result = await sut.execute({ date, collaboratorId: 'collab-1' })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.hours.map((h) => h.id.toString())).toEqual([
        hour1.id.toString(),
        hour3.id.toString(),
      ])
    }
  })
})
