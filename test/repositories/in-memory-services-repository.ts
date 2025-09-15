import { ServicesRepository } from "src/domain/application/repositories/service-repository";
import { Service } from "src/domain/enterprise/entities/service";

export class InMemoryServicesRepository implements ServicesRepository {

  public items: Service[] = []

  async create(service: Service): Promise<void> {
    this.items.push(service)
  }

  async findById(id: string): Promise<Service | null> {
    const service = this.items.find((item) => item.id.toString() === id)
    return service ?? null
  }
}