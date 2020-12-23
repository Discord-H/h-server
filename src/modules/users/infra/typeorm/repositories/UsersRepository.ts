import { getMongoRepository, MongoRepository } from 'typeorm';

import { IUserCreateDTO } from '@modules/users/dtos/IUserCreateDTO';
import { IUserUpdateDTO } from '@modules/users/dtos/IUserUpdateDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { User } from '../entities/User';

export class UsersRepository implements IUsersRepository {
  orm: MongoRepository<User>;

  constructor() {
    this.orm = getMongoRepository(User);
  }

  async create(data: IUserCreateDTO): Promise<User> {
    const user = this.orm.create({
      ...data,
      warns: 0,
      all_time_warns: 0,
    });

    await this.orm.save(user);

    return user;
  }

  findByDiscord(id: number): Promise<User> {
    return this.orm.findOne({
      discord_id: id,
    });
  }

  async update(data: IUserUpdateDTO): Promise<void> {
    this.orm.update(
      {
        _id: data.id,
      },
      {
        warns: data.warns,
        all_time_warns: data.all_time_warns,
      }
    );
  }

  async findAll(): Promise<User[]> {
    return this.orm.find();
  }
}
