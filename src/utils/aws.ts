import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, type ObjectCannedACL } from '@aws-sdk/client-s3';
import { Config } from '../config';
import logger from './logger';

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

  async uploadFile(bucket: string, key: string, body: string, acl: ObjectCannedACL = 'public-read') {
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: body,
          ACL: acl,
        }),
      );

      return `https://${bucket}.s3.${Config.awsRegion}.amazonaws.com/${key}`;
    } catch (err) {
      logger.error(err);
      return null;
    }
  }

  async getFile(bucket: string, key: string) {
    try {
      const response = await this.s3Client.send(
        new GetObjectCommand({
          Bucket: bucket,
          Key: key,
        }),
      );

      return response.Body;
    } catch (err) {
      logger.error(err);
      return null;
    }
  }

  async deleteFile(bucket: string, key: string) {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: bucket,
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
