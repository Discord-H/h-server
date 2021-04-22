type level = 'error' | 'info';
export interface ILoggingProps {
  level?: level;
  message: string;
  metadata?: any;
}

export interface ILoggerProvider {
  log(logging: ILoggingProps): void;
}
