import { IUserCreateDTO } from '../dtos/IUserCreateDTO';
import { IUserUpdateDTO } from '../dtos/IUserUpdateDTO';
import { User } from '../infra/typeorm/entities/User';

export interface IUsersRepository {
  findByDiscord(discordId: number): Promise<User>;
  create(data: IUserCreateDTO): Promise<User>;
  update(data: IUserUpdateDTO): Promise<void>;
  findAll(): Promise<User[]>;
}
