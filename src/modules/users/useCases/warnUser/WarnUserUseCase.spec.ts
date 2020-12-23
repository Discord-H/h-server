import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';

import { IUsersRepository } from '../../repositories/IUsersRepository';
import { WarnUserUseCase } from './WarnUserUseCase';

let usersRepository: IUsersRepository;
let warnUserUseCase: WarnUserUseCase;

describe('Warn user', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    warnUserUseCase = new WarnUserUseCase(usersRepository);
  });

  it('Should be able create and warn users', async (next) => {
    const newUserData = {
      discord_id: 1,
      name: 'name',
      profile_pic: 'pic',
    };

    const data = await warnUserUseCase.execute({
      data: newUserData,
      warn: 'leve',
    });

    expect(data).toBe('warn');

    next();
  });

  it('Should be able to warn users', async (next) => {
    const newUserData = {
      discord_id: 1,
      name: 'name',
      profile_pic: 'pic',
    };

    const user = await usersRepository.create(newUserData);

    const data = await warnUserUseCase.execute({
      data: newUserData,
      warn: 'leve',
    });

    expect(data).toBe('warn');

    expect(
      (await usersRepository.findByDiscord(user.discord_id)).all_time_warns
    ).toEqual(1);

    next();
  });

  it('Should be able to mute users', async (next) => {
    const newUserData = {
      discord_id: 1,
      name: 'name',
      profile_pic: 'pic',
    };

    const user = await usersRepository.create(newUserData);

    await usersRepository.update({
      id: user._id,
      warns: 1,
      all_time_warns: 1,
    });

    const data = await warnUserUseCase.execute({
      data: newUserData,
      warn: 'leve',
    });

    expect(data).toBe('mute');

    expect(
      (await usersRepository.findByDiscord(user.discord_id)).all_time_warns
    ).toEqual(2);

    next();
  });

  it('Should be able to mute users and add 2 to all time', async (next) => {
    const newUserData = {
      discord_id: 1,
      name: 'name',
      profile_pic: 'pic',
    };

    const user = await usersRepository.create(newUserData);

    const data = await warnUserUseCase.execute({
      data: newUserData,
      warn: 'grave',
    });

    expect(data).toBe('mute');

    expect(
      (await usersRepository.findByDiscord(user.discord_id)).all_time_warns
    ).toEqual(2);

    next();
  });
});
