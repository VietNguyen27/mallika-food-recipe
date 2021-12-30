import { Router } from 'express';
import {
  register,
  login,
  getDataFromToken,
} from '../controllers/userController';

const router = Router();

// @routes POST api/user
// @desc Register new account
router.route('/register').post(register);

// @routes POST api/user
// @desc Login with created account
router.route('/login').post(login);

// @routes GET api/user
// @desc Get user information with access token
router.route('/fetch').get(getDataFromToken);

export default router;
