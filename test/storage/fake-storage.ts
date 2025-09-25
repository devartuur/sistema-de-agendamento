import { randomUUID } from 'crypto'
import { StorageUploader, UploadParams, UploadResponse } from 'src/domain/application/storage/storage-repository'

interface FakeUpload {
  fileName: string
  url: string
}

export class FakeStorage implements StorageUploader {
  public uploads: FakeUpload[] = []

  async upload({ fileName }: UploadParams): Promise<UploadResponse> {
    const url = randomUUID()

    this.uploads.push({
      fileName,
      url,
    })

    return { url }
  }

  createURL(key?: string): string {
    return key ?? ''
  }

  async delete(fileName: string): Promise<{ success: boolean }> {
    const index = this.uploads.findIndex((item) => item.url === fileName)
    this.uploads.splice(index, 1)
    return {
      success: true
    }
  }

  
}
