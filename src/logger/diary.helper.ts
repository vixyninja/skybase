import * as winston from 'winston';
const {json, combine, timestamp, splat} = winston.format;

export const DiaryHelper = winston.createLogger({
  level: 'info',
  levels: winston.config.syslog.levels,
  format: json(),
  defaultMeta: {service: 'user-service', env: 'dev'},
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      dirname: 'logs',
      format: combine(timestamp(), json(), splat()),
    }),
    new winston.transports.File({
      filename: 'warn.log',
      level: 'warn',
      dirname: 'logs',
      format: combine(timestamp(), json(), splat()),
    }),
    new winston.transports.File({
      filename: 'combined.log',
      dirname: 'logs',
      format: combine(timestamp(), json(), splat()),
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: 'exceptions.log',
      dirname: 'logs',
      format: combine(timestamp(), json(), splat()),
    }),
  ],
  exitOnError: false,
  handleExceptions: true,
  handleRejections: true,
  rejectionHandlers: [
    new winston.transports.File({
      filename: 'rejections.log',
      dirname: 'logs',
      format: combine(timestamp(), json(), splat()),
    }),
  ],
  silent: false,
});
