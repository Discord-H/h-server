import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { FindAllUsersUseCase } from './FindAllUsersUseCase';

let usersRepository: IUsersRepository;
let findAllUsersUseCase: FindAllUsersUseCase;

describe('Find all', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    findAllUsersUseCase = new FindAllUsersUseCase(usersRepository);
  });

  it('Should be able to find all users', async (next) => {
    const newUserData = {
      discord_id: 1,
      name: 'name',
      profile_pic: 'pic',
    };

    await usersRepository.create(newUserData);

    const data = await findAllUsersUseCase.execute();

    expect(data).toEqual(
      expect.arrayContaining([expect.objectContaining(newUserData)])
    );

    next();
  });
});
