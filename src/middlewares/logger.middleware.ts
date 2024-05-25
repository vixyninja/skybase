import {HttpStatus, Injectable, Logger, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';

@Injectable()
export class LoggersMiddleware implements NestMiddleware {
  private logger = new Logger('RESTFUL API');

  use(req: Request, res: Response, next: NextFunction) {
    const userAgent = req.get('user-agent') || '';
    res.on('finish', () => {
      const {method, originalUrl, ip} = req;
      const {statusCode, statusMessage} = res;

      if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.error(`${method} ${originalUrl} ${statusCode} ${statusMessage} - ${userAgent} ${ip}`);
      } else if (statusCode >= HttpStatus.BAD_REQUEST) {
        this.logger.warn(`${method} ${originalUrl} ${statusCode} ${statusMessage} - ${userAgent} ${ip}`);
      } else {
        this.logger.verbose(`${method} ${originalUrl} ${statusCode} ${statusMessage} - ${userAgent} ${ip}`);
      }
    });
    next();
  }
}
