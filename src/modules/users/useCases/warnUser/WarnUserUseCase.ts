import { inject, injectable } from 'tsyringe';

import IUseCase from '@shared/core/IUseCase';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { IWarnUserDTO, warnResponseType } from './WarnUserDTO';

@injectable()
export class WarnUserUseCase implements IUseCase<IWarnUserDTO, string> {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute({ data, warn }: IWarnUserDTO): Promise<warnResponseType> {
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

    return warn === 'leve' || warn === 'grave' ? 'mute' : 'even';
  }
}
