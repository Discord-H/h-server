import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAllUsersUseCase } from './FindAllUsersUseCase';

export class FindAllUsersController {
  async execute(_: Request, res: Response): Promise<Response> {
    const findAllUsersUseCase = container.resolve(FindAllUsersUseCase);

    const data = await findAllUsersUseCase.execute();

    return res.status(200).json(data);
  }
}
