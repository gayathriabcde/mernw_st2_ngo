import { Router } from "express";
import { loginWithGoogle } from "../Controller/authController.js";

const authRouter = Router();

authRouter.post('/google', loginWithGoogle);

export default authRouter;  