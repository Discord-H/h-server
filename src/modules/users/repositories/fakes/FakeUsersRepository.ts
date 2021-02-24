import { v4 as uuid } from 'uuid';

import { IUserCreateDTO } from '@modules/users/dtos/IUserCreateDTO';
import { IUserUpdateDTO } from '@modules/users/dtos/IUserUpdateDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';

import { IUsersRepository } from '../IUsersRepository';

export class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create(data: IUserCreateDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { ...data, _id: uuid(), warns: 0, all_time_warns: 0 });

    this.users.push(user);
    return user;
  }

  async findByDiscord(id: number): Promise<User> {
    return this.users.find((user) => user.discord_id === id);
  }

  async update({
    id,
    warns,
    all_time_warns,
    profile_pic,
  }: IUserUpdateDTO): Promise<void> {
    this.users = this.users.map((user) => {
      if (user._id === id) {
        return {
          ...user,
          warns,
          all_time_warns,
          profile_pic,
        };
      }

      return user;
    });
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}
