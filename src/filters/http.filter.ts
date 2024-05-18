import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    return response.status(status).json({
      statusCode: status,
      data: {
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message.error || exception.message || null,
      },
    });
  }
}
