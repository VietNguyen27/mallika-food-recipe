import { Router } from 'express';
import {
  addRecipe,
  deleteRecipe,
  getAllRecipes,
  getFeaturedRecipes,
  getMoreRecipes,
  getMyRecipes,
  getOtherUserRecipes,
  getRecipeById,
  likeRecipe,
  unlikeRecipe,
  updateRecipe,
} from '../controllers/recipe.controller';
import {
  addNewReview,
  deleteReview,
  getAllReviews,
  getMoreReviews,
  updateReview,
} from '../controllers/review.controller';
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

// @routes GET api/recipes/user
// @desc Get recipes by userId
router.route('/user/:id').get(auth, getOtherUserRecipes);

// @routes PATCH api/recipes/me
// @desc PATCH my recipes
router.route('/like/:id').patch(auth, likeRecipe);

// @routes PATCH api/recipes/me
// @desc PATCH my recipes
router.route('/unlike/:id').patch(auth, unlikeRecipe);

// @routes POST api/recipe/:recipeId/reviews
// @desc Create new review
router.route('/:recipeId/reviews').post(auth, addNewReview);

// @routes GET api/recipe/recipeId/reviews/all
// @desc Get all reviews
router.route('/:recipeId/reviews/all').get(auth, getAllReviews);

// @routes GET api/recipe/recipeId/reviews/more
// @desc Get more reviews
router.route('/:recipeId/reviews/more').get(auth, getMoreReviews);

// @routes PATCH api/recipe/:recipeId/reviews/:reviewId
// @desc Update selected review
router.route('/:recipeId/reviews/:reviewId').patch(auth, updateReview);

// @routes DELETE api/recipe/:recipeId/reviews/:reviewId
// @desc Delete the selected review
router.route('/:recipeId/reviews/:reviewId').delete(auth, deleteReview);

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
