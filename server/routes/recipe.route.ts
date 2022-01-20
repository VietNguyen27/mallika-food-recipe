import { Router } from 'express';
import {
  addRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
} from '../controllers/recipe.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

// @routes POST api/recipe
// @desc Create new recipe
router.route('/').post(auth, addRecipe);

// @routes PATCH api/recipe
// @desc Update the selected recipe
router.route('/:id').patch(auth, updateRecipe);

// @routes DELETE api/recipe
// @desc Delete the selected recipe
router.route('/:id').delete(auth, deleteRecipe);

// @routes GET api/recipe
// @desc Get recipe detail
router.route('/:id').get(auth, getRecipeById);

// @routes GET api/recipe
// @desc Get all recipes
router.route('/').get(auth, getAllRecipes);

export default router;
