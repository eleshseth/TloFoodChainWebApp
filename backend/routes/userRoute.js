import express from 'express';
import {
  loginUser,
  registerUser,
  checkAuthentication,
  forgotPassword,
  resetPassword,
} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/check-auth', authMiddleware, checkAuthentication);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password', resetPassword);

export default userRouter;
