import { createLogger, Logger } from 'winston';

import { winstonConfig } from '@config/winston';

import { ILoggerProvider, ILoggingProps } from '../../models/ILoggerProvider';

class WinstonLoggerProvider implements ILoggerProvider {
  private logger: Logger;

  constructor() {
    this.logger = createLogger(winstonConfig);
  }

  log({ level = 'info', message, metadata }: ILoggingProps): void {
    this.logger.log(level, message, { ...metadata });
  }
}

export { WinstonLoggerProvider };
