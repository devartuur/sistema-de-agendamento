import { Service } from "src/domain/enterprise/entities/service";

export abstract class ServicesRepository {
  abstract create(service: Service): Promise<void>
  abstract findById(id: string): Promise<Service | null> 
}