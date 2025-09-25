import { Injectable } from '@nestjs/common'

import { S3Service } from './s3.service'
import {  StorageUploader, UploadParams, UploadResponse } from 'src/domain/application/storage/storage-repository'

@Injectable()
export class S3Storage implements StorageUploader {
  constructor(private s3: S3Service) {}

  static createURL(key?: string): string {
    if (!key) return ''
    return `${process.env.AWS_BUCKET_URL}${key}`
  }

  async upload({
    fileName,
    file,
    contentType,
  }: UploadParams): Promise<UploadResponse> {
    if (!fileName.startsWith('/')) {
      throw new Error('File name must start with a "/"')
    }

    const fileNameWithoutSlash = fileName.replace(/^\//, '')

    const url = await this.s3.sendCreateObjectCommand({
      key: fileNameWithoutSlash,
      body: file,
      contentType,
    })

    return { url }
  }

  createURL(key?: string): string {
    return S3Storage.createURL(key)
  }

  async delete(fileName: string): Promise<{success: boolean}> {
    if (!fileName.startsWith('/')) {
      throw new Error('File name must start with a "/"')
    }

    const fileNameWithoutSlash = fileName.replace(/^\//, '')
    
    return this.s3.sendDeleteObjectCommand(fileNameWithoutSlash)
  }

}
