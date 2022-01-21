import { Router } from 'express';
import {
  getUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/user.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

// @routes GET api/users/me
// @desc Get user information
router.route('/me').get(auth, getUser);

// @routes GET api/users/all
// @desc Get all users
router.route('/all').get(auth, getUsers);

// @routes GET api/users/:id
// @desc Get user by unique ID
router.route('/:id').get(auth, getUserById);

// @routes PATCH api/users/:id
// @desc Update user
router.route('/:id').patch(auth, updateUser);

export default router;
