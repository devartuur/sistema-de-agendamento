import { PrismaService } from "../prisma.service"
import { CustomerPhotosRepository } from "src/domain/application/repositories/user-photos-repository"
import { Injectable } from "@nestjs/common"
import { PrismaCustomerPhotoMapper } from "../mappers/prisma-user-photo-mapper"
import { CustomerPhoto } from "src/domain/enterprise/entities/user-photo"

@Injectable()
export class PrismaCustomerPhotosRepository implements CustomerPhotosRepository {
  constructor(private prisma: PrismaService) {}

  async create(photo: CustomerPhoto): Promise<void> {
    const data = PrismaCustomerPhotoMapper.toPrisma(photo)

    await this.prisma.customerPhoto.create({ data })
  }

  async delete(photo: CustomerPhoto): Promise<void> {
    await this.prisma.customerPhoto.delete({
      where: { id: photo.id.toString() },
    })
  }

  async findAll(): Promise<CustomerPhoto[]> {
    const items = await this.prisma.customerPhoto.findMany()
    return items.map(PrismaCustomerPhotoMapper.toDomain)
  }

  async findAllByNotGeneratedPhoto(photoIds: string[]): Promise<CustomerPhoto[]> {
    // Fotos de usuário que ainda não possuem uma foto gerada em `photos` (simulação por ids)
    const items = await this.prisma.customerPhoto.findMany({
      where: {
        id: { in: photoIds }
      }
    })

    return items.map(PrismaCustomerPhotoMapper.toDomain)
  }
}
