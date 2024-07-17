import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { NODE_ENV } from '../constants';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly nodeEnv: NODE_ENV = NODE_ENV.production,
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger?: LoggerService,
  ) {}

  catch(exception: Error, host: ArgumentsHost): void {
    if (exception instanceof HttpException) {
      return this.throwError(exception, host);
    }

    let customMessage;
    if (this.nodeEnv === NODE_ENV.production) {
      customMessage = 'Internal Server Error';
    }
    const httpError = new HttpException(
      HttpException.createBody({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: customMessage ?? exception.message,
      }),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    return this.throwError(httpError, host);
  }

  private throwError(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const response = exception.getResponse() as { message?: unknown };

    const body = {
      message: response.message,
      statusCode: exception.getStatus(),
    };

    httpAdapter.reply(ctx.getResponse(), body, exception.getStatus());
  }
}
