import { Router } from 'express';
import {
  searchRecipesByTitle,
  searchUsers,
  searchRecipesByIngredient,
} from '../controllers/search.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

// @routes GET api/search?title=title
// @desc Get all recipes match with param title
router.route('/').get(auth, searchRecipesByTitle);

// @routes GET api/search?user=user
// @desc Get all users match with username or email
router.route('/').get(auth, searchUsers);

// @routes GET api/search?ingredient=ingredient
// @desc Get all recipes match with param ingredient
router.route('/').get(auth, searchRecipesByIngredient);

export default router;
