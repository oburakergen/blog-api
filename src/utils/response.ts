import { Response } from 'express';
import HttpStatusCode from './httpStatusCode';
import logger from './logger';

export const success = (res: Response, data: Record<string, any> | string, statusCode: HttpStatusCode = HttpStatusCode.OK) => {
  return res.status(statusCode).json({ message: HttpStatusCode[statusCode], data, status: statusCode });
};

export const error = (res: Response, errors?: Record<string, any> | string, statusCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR) => {
  const message = HttpStatusCode[statusCode];
  logger.error(JSON.stringify({ errors, statusCode }));

  return res.status(statusCode).json({
    message: (errors as any).message ? (errors as any).message : message,
    status: statusCode,
    errors,
  });
};
