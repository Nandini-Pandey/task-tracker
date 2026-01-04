import express from 'express';
import { signup, login } from '../controller/authController.js';

const authRouter = express.Router();   // or const {Router} = express;   


authRouter.post('/signup', signup);
authRouter.post('/login', login);
export default authRouter;