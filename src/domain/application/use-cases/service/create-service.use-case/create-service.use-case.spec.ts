import { InMemoryServicesRepository } from "test/repositories/in-memory-services-repository"
import { ServicesRepository } from "src/domain/application/repositories/service-repository"
import { CreateServiceUseCase } from "./create-service.use-case"

let sut: CreateServiceUseCase
let servicesRepository: ServicesRepository

describe('[CreateServiceUseCase]', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    sut = new CreateServiceUseCase(servicesRepository)
  })

  it('should create a service successfully', async () => {
    const result = await sut.execute({
      name: 'Corte de Cabelo',
      description: 'Corte padrão masculino',
      duration: 40,
      price: 50,
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.service.name).toBe('Corte de Cabelo')
      expect(result.value.service.duration).toBe(40)
      expect(result.value.service.price).toBe(50)
    }
  })
})
