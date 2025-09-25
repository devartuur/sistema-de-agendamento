import { Either, right } from "src/core/utils/either";
import { CustomerPhotosRepository } from "src/domain/application/repositories/user-photos-repository";
import { StorageUploader } from "src/domain/application/storage/storage-repository";

export type DeletePhotoUseCaseResponse = Either<
  null,
  {
    userPhotosNotGenetadedPhoto: number,
    deleted: number
  }
>

export class DeleteUserPhotoUseCase {
  constructor(
      private customerPhotosRepository: CustomerPhotosRepository,
      private storage: StorageUploader
    ) {}

    async execute() {
      const allUserPhotos = await this.customerPhotosRepository.findAll()
      const oneDayInMilliseconds = 86400000 // 24h em ms
      const now = new Date().getTime()

      const filteredNotGeneratedPhotos = allUserPhotos.filter(
        (item) => item.createdAt.getTime() + oneDayInMilliseconds <= now)

      const results = await Promise.all(
        filteredNotGeneratedPhotos.map((item) => {
          return this.storage.delete(item.url)
        })
      )

      return right({
        userPhotosNotGenetadedPhoto: allUserPhotos.length,
        deleted: results.length
      })
    }
}