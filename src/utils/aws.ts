import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, type ObjectCannedACL } from '@aws-sdk/client-s3';
import { Config } from '../config';
import logger from './logger';
import { HttpException } from '../exceptions/HttpException';

export class AwsS3 {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: Config.awsRegion,
      credentials: {
        accessKeyId: Config.awsAccessKeyId,
        secretAccessKey: Config.awsSecretAccessKey,
      },
    });
  }

  async uploadFile(key: string, body: Buffer, contentType: string, acl: ObjectCannedACL = 'public-read') {
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: Config.awsBucketName,
          Key: key,
          Body: body,
          ACL: acl,
          ContentType: contentType,
        }),
      );

      return `https://${Config.awsBucketName}.s3.${Config.awsRegion}.amazonaws.com/${key}`;
    } catch (err) {
      logger.error(err);
      throw new HttpException(500, 'Failed to upload');
    }
  }

  async getFile(key: string) {
    try {
      const response = await this.s3Client.send(
        new GetObjectCommand({
          Bucket: Config.awsBucketName,
          Key: key,
        }),
      );

      return response.Body;
    } catch (err) {
      logger.error(err);
      return null;
    }
  }

  async deleteFile(key: string) {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: Config.awsBucketName,
          Key: key,
        }),
      );

      return true;
    } catch (err) {
      logger.error(err);
      return false;
    }
  }
}
