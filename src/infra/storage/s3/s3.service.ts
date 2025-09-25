// Dependencies
import { Injectable } from '@nestjs/common'
import { ObjectCannedACL, PutObjectCommand, S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { Config } from '@swc/core'
import { ConfigService } from '@nestjs/config'
import { Env } from 'src/infra/env'

type CommandParams = {
  key: string
  body: Buffer
  contentType: string
  acl?: ObjectCannedACL
}

@Injectable()
export class S3Service extends S3Client {
  constructor(private env: ConfigService<Env>) {
    super({
      region: env.get('AWS_SECRET_BUCKET_REGION'),
      profile: env.get('AWS_SECRET_BUCKET_PROFILE')
    })
  }

  public async sendCreateObjectCommand({
    key,
    body,
    contentType,
    acl,
  }: CommandParams): Promise<string> {
    const bucket = this.env.get('AWS_SECRET_BUCKET_NAME')

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ACL: acl || 'public-read',
      ContentType: contentType,
    })

    try {
      await this.send(command)

      return `https://${bucket}.s3.amazonaws.com/${key}`
    } catch (error) {
      console.error('Error uploading file to S3:', error)
      throw error
    }
  }

  public async sendDeleteObjectCommand(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.env.get('AWS_SECRET_BUCKET_PROFILE'),
      Key: key
    })

    try {
      await this.send(command)
      return {success: true}
    }
    catch (error) {
      console.error('Error delete file to S3:', error)
      throw error
    }
  }
}
