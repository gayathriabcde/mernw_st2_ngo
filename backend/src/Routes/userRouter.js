import express from 'express';
import { getUserDetails } from '../Controller/userController.js';
import { verifyAdminRole } from '../Middleware/activityMiddleware.js';

const userRouter = express.Router();

userRouter.get('/me', getUserDetails);
userRouter.get('/all', verifyAdminRole, getAllUsers);

export default userRouter;
