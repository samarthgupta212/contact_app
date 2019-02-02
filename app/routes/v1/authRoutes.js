import express from 'express';
import { authController } from '../../controllers';
import { verifyAdminToken } from '../../middlewares';

const initAuthRoutes = () => {
  const authRoutes = express.Router();

  authRoutes.post('/sign_in', verifyAdminToken, authController.login);
  authRoutes.delete('/sign_out', authController.signout);

  return authRoutes;
};

export default initAuthRoutes;
