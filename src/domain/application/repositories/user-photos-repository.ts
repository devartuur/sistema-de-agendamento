import { CustomerPhoto } from "src/domain/enterprise/entities/user-photo";

export abstract class CustomerPhotosRepository {
  abstract create(photo: CustomerPhoto): Promise<void>
  abstract delete(photo: CustomerPhoto): Promise<void>
  abstract findAll(): Promise<CustomerPhoto[]>
  abstract findAllByNotGeneratedPhoto(photoIds: string[]): Promise<CustomerPhoto[]>
}
