import { InMemoryServicesRepository } from "test/repositories/in-memory-services-repository"
import { ServicesRepository } from "src/domain/application/repositories/service-repository"
import { FetchServiceUseCase } from "./fetch-service.use-case"
import { makeService } from "test/factories/make-service"
import { ResourceNotFoundError } from "src/core/errors/errors/resource-not-found.error"

let sut: FetchServiceUseCase
let servicesRepository: ServicesRepository

describe('[FetchServiceUseCase]', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    sut = new FetchServiceUseCase(servicesRepository)
  })

  it('should fetch an existing service successfully', async () => {
    const service = makeService({})
    await servicesRepository.create(service)

    const result = await sut.execute({ serviceId: service.id.toString() })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.service).toEqual(service)
    }
  })

  it('should return ResourceNotFoundError if service does not exist', async () => {
    const result = await sut.execute({ serviceId: 'non-existent-id' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
