import express from 'express';
import userRouter from './user.js';
import companyRouter from './company.js';
import applicationRouter from './application.js';
import contactRouter from './contact.js';
import authRouter from './auth-routes.js';

const router = express.Router();

router.use('/users', userRouter);

router.use('/companies', companyRouter);

router.use('/applications', applicationRouter);

router.use('/contacts', contactRouter);

router.use('/auth', authRouter);

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

export default router;
