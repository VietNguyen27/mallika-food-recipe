import { Router } from 'express';
import {
  setLikedRecipe,
  getAllLikedRecipes,
  deleteLikedRecipe,
} from '../controllers/liked.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

router.route('/').post(auth, setLikedRecipe);
router.route('/all').get(auth, getAllLikedRecipes);
router.route('/:id').delete(auth, deleteLikedRecipe);

export default router;
