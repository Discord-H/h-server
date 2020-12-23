import { IUserCreateDTO } from '@modules/users/dtos/IUserCreateDTO';

export type warnType = 'leve' | 'grave' | 'hedionda';

export interface IWarnUserDTO {
  warn: warnType;
  data: IUserCreateDTO;
}

export type warnResponseType = 'warn' | 'mute' | 'even';
