import { Router } from 'express';

import { userRouter } from '@modules/users/infra/http/uses.router';

const router = Router();

router.use('/users', userRouter);

export { router };
