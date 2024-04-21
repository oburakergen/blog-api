import { config } from 'dotenv';

config({ path: '.env' });

export const Config = {
  port: process.env.PORT || 3000,
  url: process.env.URL || 'http://localhost',
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/express-mongo',
  jwtSecret: process.env.SECRET_KEY || 'secret',
  jwtExpiration: process.env.JWT_EXPIRATION || '1h',
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  awsBucketName: process.env.AWS_S3_BUCKET || '',
  awsRegion: process.env.AWS_S3_REGION || '',
};
