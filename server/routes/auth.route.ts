import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';

const router = Router();

// @routes POST api/auth
// @desc Register new account
router.route('/register').post(register);

// @routes POST api/auth
// @desc Login with created account
router.route('/login').post(login);

export default router;
