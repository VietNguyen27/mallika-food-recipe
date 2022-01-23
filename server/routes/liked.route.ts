import { Router } from 'express';
import {
  addLikedRecipe,
  getAllLikedRecipes,
  getMoreLikedRecipes,
  removeLikedRecipe,
} from '../controllers/liked.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

// @routes POST api/liked
// @desc Create new recipe
router.route('/').post(auth, addLikedRecipe);

// @routes GET api/liked/all
// @desc Get all recipes
router.route('/all').get(auth, getAllLikedRecipes);

// @routes GET api/liked/more
// @desc Get more recipes
router.route('/more').get(auth, getMoreLikedRecipes);

// @routes DELETE api/liked/:id
// @desc Delete the selected recipe
router.route('/:id').delete(auth, removeLikedRecipe);

export default router;
