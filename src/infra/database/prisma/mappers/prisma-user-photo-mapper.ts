import { Prisma } from "@prisma/client"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"
import { CustomerPhoto } from "src/domain/enterprise/entities/user-photo"
import { Slug } from "src/domain/enterprise/value-objects/slug"
import { CustomerPhoto as PrismaCustomerPhoto } from "@prisma/client"

export class PrismaCustomerPhotoMapper {
  static toDomain(raw: PrismaCustomerPhoto): CustomerPhoto {
    return CustomerPhoto.create(
      {
        name: Slug.create(raw.name),
        url: raw.url,
        userId: raw.customerId ? new UniqueEntityID(raw.customerId) : null,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(photo: CustomerPhoto): Prisma.CustomerPhotoUncheckedCreateInput {
    return {
      id: photo.id.toString(),
      name: photo.name.value,
      url: photo.url,
      customerId: photo.userId?.toString() ?? null,
      createdAt: photo.createdAt,
      updatedAt: photo.updatedAt,
    }
  }
}
