import { Router } from 'express';
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getFeaturedRecipes,
  getOtherUserRecipes,
  getRecipeById,
  likeRecipe,
  unlikeRecipe,
  updateRecipe,
} from '../controllers/recipe.controller';
import {
  createNewReview,
  deleteReview,
  getAllReviews,
  getMoreReviews,
  updateReview,
} from '../controllers/review.controller';
import { auth } from '../middlewares/auth.middleware';

const router = Router();

router.route('/').post(auth, createRecipe);
router.route('/featured').get(auth, getFeaturedRecipes);
router.route('/all').get(auth, getAllRecipes);
router.route('/user/:id').get(auth, getOtherUserRecipes);
router.route('/:id/like').patch(auth, likeRecipe);
router.route('/:id/unlike').patch(auth, unlikeRecipe);
router.route('/:recipeId/reviews').post(auth, createNewReview);
router.route('/:recipeId/reviews/all').get(auth, getAllReviews);
router.route('/:recipeId/reviews/more').get(auth, getMoreReviews);
router.route('/:recipeId/reviews/:reviewId').patch(auth, updateReview);
router.route('/:recipeId/reviews/:reviewId').delete(auth, deleteReview);
router.route('/:id').patch(auth, updateRecipe);
router.route('/:id').delete(auth, deleteRecipe);
router.route('/:id').get(auth, getRecipeById);

export default router;
