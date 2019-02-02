import express from 'express';
import { usersController } from '../../controllers';
import { verifyToken, verifyAdminToken } from '../../middlewares';

const initUserRoutes = () => {
  const userRoutes = express.Router();

  userRoutes.post('/', verifyAdminToken, usersController.create);
  userRoutes.get('/', verifyToken, usersController.show);
  userRoutes.put('/', verifyToken, usersController.update);
  userRoutes.put('/:userId/verify', verifyAdminToken, usersController.verify);

  return userRoutes;
};

export default initUserRoutes;
