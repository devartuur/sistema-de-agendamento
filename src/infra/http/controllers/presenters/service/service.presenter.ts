import { Service } from "src/domain/enterprise/entities/service";

export class ServicePresenter {
  static toHttp(service: Service) {
    return {
      id: service.id,
      name: service.name,
      price: service.price,
      duration: service.duration,
      description: service.description,
    }
  }
}