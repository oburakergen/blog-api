import winston from 'winston';
import { Config } from '../config';

interface LoggerInfo {
  message: string;
  level: string;
}

const enumerateErrorFormat = winston.format((info: LoggerInfo) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: Config.nodeEnv === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    Config.nodeEnv === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf((info: LoggerInfo) => `${info.level}: ${info.message}`),
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

export default logger;
