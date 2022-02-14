import { Request, Response } from 'express';
import RecipeModel from '../models/recipe.model';
import UserModel from '../models/user.model';
import { IGetUserAuthInfoRequest } from '../utils/interfaces';
import { recipeValidation } from '../validations/recipe.validation';

const MAX_RECIPES_PER_REQUEST = 6;
const MAX_FEATURED_RECIPES = 4;

// @desc    Create new recipe
// @route   POST /api/recipes
// @access  Private
export const createRecipe = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  const { error } = recipeValidation(req.body);

  if (error) {
    res.status(400).json(error.details);
    return;
  }

  const newRecipe = new RecipeModel(req.body);
  try {
    let recipe = await newRecipe.save();
    recipe = await recipe.populate('user', 'name avatar');
    await UserModel.findOneAndUpdate(
      { _id: req.user._id },
      {
        $inc: { numRecipes: 1 },
      },
      { returnOriginal: false }
    );

    if (!recipe) {
      res
        .status(400)
        .json({ error: 'Something went wrong while creating this recipe!' });
      return;
    }

    res.status(200).json(recipe);
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

// @desc    Get featured recipes
// @route   GET /api/recipes/featured
// @access  Private
export const getFeaturedRecipes = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const recipes = await RecipeModel.find({
      user: { $nin: req.user._id },
      isPublished: true,
    })
      .populate('user', 'name avatar')
      .sort({ _id: -1 })
      .limit(MAX_FEATURED_RECIPES);

    if (!recipes) {
      res.status(400).json({
        error: 'Something went wrong while getting featured recipes!',
      });
      return;
    }

    res.status(200).json(recipes);
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

// @desc    Get recipes by userId
// @route   GET /api/recipes/user/:id
// @access  Private
export const getOtherUserRecipes = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const isAuth = req.user._id.toString() === req.params.id.toString();

    const recipes = await RecipeModel.find(
      {
        user: req.params.id,
        ...(!isAuth && { isPublished: true }),
      },
      undefined,
      { skip }
    )
      .populate('user', 'name avatar')
      .sort({ _id: -1 })
      .limit(MAX_RECIPES_PER_REQUEST);

    if (!recipes) {
      res.status(400).json({
        error: 'Something went wrong while getting featured recipes!',
      });
      return;
    }

    res.status(200).json(recipes);
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

// @desc    Get all recipes
// @route   GET /api/recipes/all
// @access  Private
export const getAllRecipes = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const recipes = await RecipeModel.find(
      {
        user: { $nin: req.user._id },
        isPublished: true,
      },
      undefined,
      { skip }
    )
      .populate('user', 'name avatar')
      .sort({ _id: -1 })
      .limit(MAX_RECIPES_PER_REQUEST);

    if (!recipes) {
      res
        .status(400)
        .json({ error: 'Something went wrong while getting all recipes!' });
      return;
    }

    res.status(200).json(recipes);
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

// @desc    Get recipe by id
// @route   GET /api/recipes/:id
// @access  Private
export const getRecipeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const recipe = await RecipeModel.findById(req.params.id)
      .select('-reviews')
      .populate('user', 'name');
    if (!recipe) {
      res
        .status(400)
        .json({ error: 'Something went wrong while getting this recipe!' });
      return;
    }

    res.status(200).json(recipe);
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

// @desc    Update recipe
// @route   PATCH /api/recipes/:id
// @access  Private
export const updateRecipe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const recipe = await RecipeModel.findByIdAndUpdate(req.params.id, req.body);
    if (!recipe) {
      res
        .status(400)
        .json({ error: 'Something went wrong while updating this recipe!' });
      return;
    }

    res.status(200).json(recipe);
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Private
export const deleteRecipe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const recipe = await RecipeModel.findByIdAndDelete(req.params.id);
    if (!recipe) {
      res
        .status(400)
        .json({ error: 'Something went wrong while updating this recipe!' });
      return;
    }

    res.status(200).json({ message: 'Deleted this recipe successfully!' });
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

// @desc    Like recipe
// @route   PATCH /api/recipes/:id/like
// @access  Private
export const likeRecipe = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const recipe = await RecipeModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $inc: { likedCount: 1 },
        $push: { likes: req.user._id },
      },
      { returnOriginal: false }
    ).populate('user', 'name avatar');
    if (!recipe) {
      res
        .status(400)
        .json({ error: 'Something went wrong while updating this recipe!' });
      return;
    }

    res.status(200).json(recipe);
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

// @desc    Unlike recipe
// @route   PATCH /api/recipes/:id/unlike
// @access  Private
export const unlikeRecipe = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const recipe = await RecipeModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $inc: { likedCount: -1 },
        $pull: { likes: req.user._id },
      },
      { returnOriginal: false }
    ).populate('user', 'name avatar');
    if (!recipe) {
      res
        .status(400)
        .json({ error: 'Something went wrong while updating this recipe!' });
      return;
    }

    res.status(200).json(recipe);
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};
