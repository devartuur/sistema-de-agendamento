import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found.error'
import { Either, left, right } from 'src/core/utils/either'
import { CustomersRepository } from 'src/domain/application/repositories/customers-repository'
import { CustomerPhotosRepository } from 'src/domain/application/repositories/user-photos-repository'
import { StorageUploader } from 'src/domain/application/storage/storage-repository'
import { CustomerPhoto } from 'src/domain/enterprise/entities/user-photo'
import { Slug } from 'src/domain/enterprise/value-objects/slug'

interface UploadUserPhotoUseCaseRequest {
  executorId: string
  fileName: string
  buffer: Buffer
  fileType: string
}

type UploadUserPhotoUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    photo: CustomerPhoto
  }
>

@Injectable()
export class UploadUserPhotoUseCase {
  constructor(
    private userPhotosRepository: CustomerPhotosRepository,
    private usersRepository: CustomersRepository,
    private storage: StorageUploader,
  ) {}

  async execute({
    executorId,
    fileName,
    fileType,
    buffer,
  }: UploadUserPhotoUseCaseRequest): Promise<UploadUserPhotoUseCaseResponse> {
    const executor = await this.usersRepository.findById(executorId)
    if (!executor) return left(new ResourceNotFoundError('Customer'))

    const extension = fileName.split('.').pop()
    const nameWithoutExtension = fileName.replace(`.${extension}`, '')

    const slug = Slug.createFromText(nameWithoutExtension)

    const photo = CustomerPhoto.create({
      name: slug,
      userId: new UniqueEntityID(executorId),
    })

    photo.url = `/photos/${executorId}/${photo.id}.${extension}`

    const { url } = await this.storage.upload({
      file: buffer,
      fileName: photo.url,
      contentType: fileType,
    })

    photo.url = url

    await this.userPhotosRepository.create(photo)

    return right({ photo })
  }
}
