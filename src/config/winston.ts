import { LoggerOptions, format, transports } from 'winston';

export const winstonConfig: LoggerOptions = {
  format: format.combine(
    format.metadata(),
    format.timestamp(),
    format.prettyPrint({
      colorize: true,
    })
  ),
  transports: [
    new transports.Console({
      level: 'info',
    }),
    new transports.Console({
      level: 'error',
    }),
  ],
};
