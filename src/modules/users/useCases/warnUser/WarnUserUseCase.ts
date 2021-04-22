import { inject, injectable } from 'tsyringe';

import { ILoggerProvider } from '@shared/containers/providers/models/ILoggerProvider';
import IUseCase from '@shared/core/IUseCase';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { IWarnUserDTO, warnResponseType } from './WarnUserDTO';

@injectable()
export class WarnUserUseCase implements IUseCase<IWarnUserDTO, string> {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('LoggerProvider') private loggerProvider: ILoggerProvider
  ) {}

  async execute({ data, warn }: IWarnUserDTO): Promise<warnResponseType> {
    const startDate = process.hrtime();

    const user =
      (await this.usersRepository.findByDiscord(data.discord_id)) ||
      (await this.usersRepository.create(data));

    if (warn === 'leve' && user.warns !== 1) {
      this.usersRepository.update({
        id: user._id,
        warns: user.warns + 1,
        all_time_warns: user.all_time_warns + 1,
        profile_pic: data.profile_pic,
      });

      return 'warn';
    }

    this.usersRepository.update({
      id: user._id,
      warns: 0,
      all_time_warns: user.all_time_warns + (warn === 'leve' ? 1 : 2),
      profile_pic: data.profile_pic,
    });

    const endDate = process.hrtime(startDate);

    this.loggerProvider.log({
      message: `WarnUserUseCase completed in ${endDate[0]}.${
        endDate[1] / 1000000
      }s`,
      metadata: {
        id: user._id,
        username: user.name,
      },
    });

    return warn === 'leve' || warn === 'grave' ? 'mute' : 'even';
  }
}
