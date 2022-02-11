import { Router } from 'express';
import {
  findRecipesByTitle,
  findUsers,
  findRecipesByIngredient,
} from '../controllers/search.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

router.route('/').get(auth, findRecipesByTitle);
router.route('/').get(auth, findUsers);
router.route('/').get(auth, findRecipesByIngredient);

export default router;
