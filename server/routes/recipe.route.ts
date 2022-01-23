import { Router } from 'express';
import {
  addRecipe,
  deleteRecipe,
  getAllRecipes,
  getFeaturedRecipes,
  getMoreRecipes,
  getMyRecipes,
  getRecipeById,
  likeRecipe,
  unlikeRecipe,
  updateRecipe,
} from '../controllers/recipe.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

// @routes POST api/recipes
// @desc Create new recipe
router.route('/').post(auth, addRecipe);

// @routes GET api/recipes/featured
// @desc Get all recipes
router.route('/featured').get(auth, getFeaturedRecipes);

// @routes GET api/recipes/me
// @desc Get my recipes
router.route('/me').get(auth, getMyRecipes);

// @routes GET api/recipes/all
// @desc Get all recipes
router.route('/all').get(auth, getAllRecipes);

// @routes GET api/recipes/more
// @desc Get more recipes
router.route('/more').get(auth, getMoreRecipes);

// @routes PATCH api/recipes/me
// @desc PATCH my recipes
router.route('/like/:id').patch(auth, likeRecipe);

// @routes PATCH api/recipes/me
// @desc PATCH my recipes
router.route('/unlike/:id').patch(auth, unlikeRecipe);

// @routes PATCH api/recipes/:id
// @desc Update the selected recipe
router.route('/:id').patch(auth, updateRecipe);

// @routes DELETE api/recipes/:id
// @desc Delete the selected recipe
router.route('/:id').delete(auth, deleteRecipe);

// @routes GET api/recipes/:id
// @desc Get recipe detail
router.route('/:id').get(auth, getRecipeById);

export default router;
