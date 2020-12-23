import { Router } from 'express';

import { FindAllUsersController } from '@modules/users/useCases/findAllUsers/FindAllUsersController';

const userRouter = Router();

const findAllUsersController = new FindAllUsersController();

userRouter.get('/', findAllUsersController.execute);

export { userRouter };
