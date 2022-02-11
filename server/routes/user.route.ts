import { Router } from 'express';
import { followUser, unfollowUser } from '../controllers/follow.controller';
import {
  fetchFollowersByUserId,
  fetchFollowingByUserId,
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

// @routes POST api/users/:id/follow
// @desc Follow specified user
router.route('/:id/follow').post(auth, followUser);

// @routes DELETE api/users/:id/unfollow
// @desc Unfollow specified user
router.route('/:id/unfollow').delete(auth, unfollowUser);

// @routes POST api/users/:id/follow
// @desc Follow specified user
router.route('/:id/followers').get(auth, fetchFollowersByUserId);

// @routes DELETE api/users/:id/unfollow
// @desc Unfollow specified user
router.route('/:id/following').get(auth, fetchFollowingByUserId);

export default router;
