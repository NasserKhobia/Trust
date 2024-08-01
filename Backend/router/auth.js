import exprees from 'express';
import { login, logout, register } from '../controller/auth.js';

const router = exprees.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);



export default router