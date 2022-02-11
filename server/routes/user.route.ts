import { Router } from 'express';
import { followUser, unfollowUser } from '../controllers/follow.controller';
import {
  getFollowersByUserId,
  getFollowingByUserId,
  getUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/user.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

router.route('/me').get(auth, getUser);
router.route('/all').get(auth, getUsers);
router.route('/:id').get(auth, getUserById);
router.route('/:id').patch(auth, updateUser);
router.route('/:id/follow').post(auth, followUser);
router.route('/:id/unfollow').delete(auth, unfollowUser);
router.route('/:id/followers').get(auth, getFollowersByUserId);
router.route('/:id/following').get(auth, getFollowingByUserId);

export default router;
