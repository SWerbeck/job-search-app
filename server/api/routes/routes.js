import express from 'express';
import userRouter from './user.js';
import companyRouter from './company.js';
import applicationRouter from './application.js';
import contactRouter from './contact.js';
import authRouter from './auth-routes.js';
import guestRouter from './guest-routes.js';

const router = express.Router();

router.use('/users', userRouter);

router.use('/companies', companyRouter);

router.use('/contacts', contactRouter);

router.use('/auth', authRouter);

router.use('/guest', guestRouter);

router.use('/applications', applicationRouter);

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

export default router;
