import { Module } from '@nestjs/common'
import { S3Service } from './s3/s3.service'
import { S3Storage } from './s3/s3-storage'
import { ConfigModule } from '@nestjs/config'
import { StorageUploader } from 'src/domain/application/storage/storage-repository'

@Module({
  imports: [ConfigModule],
  providers: [S3Service, { provide: StorageUploader, useClass: S3Storage }],
  exports: [S3Service, StorageUploader],
})
export class StorageModule {}
