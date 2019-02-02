import express from 'express';
import initUserRoutes from './userRoutes';
import initContactRoutes from './contactRoutes';
import initAuthRoutes from './authRoutes';

import { verifyToken } from '../../middlewares';

const initVersion1Routes = () => {
  const v1Router = express.Router();

  v1Router.use('/', initAuthRoutes());
  v1Router.use('/users', initUserRoutes());
  v1Router.use('/contacts', verifyToken, initContactRoutes());

  return v1Router;
};

export default initVersion1Routes;
