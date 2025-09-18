import { FetchSchedullingUseCase } from "./fetch-schedulling.use-case"
import { InMemorySchedullingsRepository } from "test/repositories/in-memory-schedullings-repository"
import { makeSchedulling } from "test/factories/make-schedulling"
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found.error"
import { SchedullingsRepository } from "src/domain/application/repositories/schedullings-repository"

let sut: FetchSchedullingUseCase
let schedullingsRepository: SchedullingsRepository

describe('[FetchSchedullingUseCase]', () => {
  beforeEach(() => {
    schedullingsRepository = new InMemorySchedullingsRepository()
    sut = new FetchSchedullingUseCase(schedullingsRepository)
  })

  it('should fetch an existing schedulling successfully', async () => {
    const schedulling = makeSchedulling()
    await schedullingsRepository.create(schedulling)

    const result = await sut.execute({ schedullingId: schedulling.id.toString() })

    expect(result.isRight()).toBe(true)
    if(result.isRight()) {
      expect(result.value.schedulling).toEqual(schedulling)
    }
  })

  it('should return ResourceNotFoundError if schedulling does not exist', async () => {
    const result = await sut.execute({ schedullingId: 'non-existent-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
