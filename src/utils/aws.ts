import { S3Client } from '@aws-sdk/client-s3';
import { Config } from '../config';

const s3Client = new S3Client({
  region: Config.awsRegion,
  credentials: {
    accessKeyId: Config.awsAccessKeyId,
    secretAccessKey: Config.awsSecretAccessKey,
  },
});
