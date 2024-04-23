export class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;

    this.message = message || 'Something went wrong. Please try again.';

    this.status = status || 500;
  }
}
