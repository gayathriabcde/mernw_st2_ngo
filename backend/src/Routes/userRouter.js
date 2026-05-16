import express from 'express';
import { getUserDetails } from '../Controller/userController.js';
import { verifyRole } from '../Middleware/activityMiddleware.js';

const userRouter = express.Router();

userRouter.get('/me', getUserDetails);
userRouter.get('/all', verifyRole, getAllUsers);

export default userRouter;