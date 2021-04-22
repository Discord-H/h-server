import { container } from 'tsyringe';

import { WinstonLoggerProvider } from './implementations/logger/WinstonLoggerProvider';
import { ILoggerProvider } from './models/ILoggerProvider';

container.registerSingleton<ILoggerProvider>(
  'LoggerProvider',
  WinstonLoggerProvider
);
