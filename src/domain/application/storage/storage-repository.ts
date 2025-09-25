export type UploadParams = {
  file: Buffer

  /**
   * The file name, including the path. Should start with '/'.
   * @example '/file-name.jpg'
   */
  fileName: string

  /**
   * The MIME type of the file.
   * @example 'image/jpeg'
   */
  contentType: string
}

export type UploadResponse = {
  url: string
}

export abstract class StorageUploader {
  abstract upload(params: UploadParams): Promise<UploadResponse>
  abstract delete(fileName: string): Promise<{success: boolean}>

  abstract createURL(key?: string): string
}
