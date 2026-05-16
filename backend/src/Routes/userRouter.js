import express from 'express';
import { getUserDetails, getAllUsers, updateUserRole } from '../Controller/userController.js';
import { verifyToken, verifyRole } from '../Middleware/activityMiddleware.js';

const userRouter = express.Router();

userRouter.get('/me', verifyToken, getUserDetails);
userRouter.get('/all', verifyRole, getAllUsers);
userRouter.patch('/all/:id', verifyRole, updateUserRole);

export default userRouter;