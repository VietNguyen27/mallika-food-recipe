import { Router } from 'express';
import { getUser, getUserById, getUsers } from '../controllers/userController';
import { auth } from '../middlewares/authMiddleware';

const router = Router();

// @routes GET api/users
// @desc Get user information with access token
router.route('/me').get(getUser);

// @routes GET api/users
// @desc Get all users
router.route('/all').get(auth, getUsers);

// @routes GET api/users
// @desc Get user by unique ID
router.route('/:id').get(auth, getUserById);

export default router;
