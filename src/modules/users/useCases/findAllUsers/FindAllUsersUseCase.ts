import { inject, injectable } from 'tsyringe';

import IUseCase from '@shared/core/IUseCase';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

@injectable()
export class FindAllUsersUseCase implements IUseCase<void, User[]> {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<User[]> {
    return this.usersRepository.findAll();
  }
}
