import { NextFunction, Response } from 'express';
import { IGetUserAuthInfoRequest } from '../utils/interfaces';
import RecipeModel from '../models/recipe.model';
import UserModel from '../models/user.model';
import { iLikeVietnamese } from 'vietnamese-query';

const MAX_SEARCH_RESULTS_PER_REQUEST = 6;

// @desc    Find recipes by title
// @route   GET /api/search
// @access  Private
export const findRecipesByTitle = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.query.title) {
    next();
    return;
  }

  const skip = req.query.skip ? Number(req.query.skip) : 0;
  const recipes = await RecipeModel.find(
    {
      title: iLikeVietnamese(req.query.title as string),
      user: { $nin: req.user._id },
      isPublished: true,
    },
    undefined,
    { skip }
  )
    .select('title time image difficulty serve')
    .sort({ _id: -1 })
    .limit(MAX_SEARCH_RESULTS_PER_REQUEST);

  if (!recipes) {
    res
      .status(400)
      .json({ error: 'Cannot find those recipes. Please try again!' });
    return;
  }

  res.status(200).json(recipes);
  return;
};

// @desc    Find users by username or email
// @route   GET /api/search
// @access  Private
export const findUsers = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.query.user) {
    next();
    return;
  }

  const user = req.query.user;
  const skip = req.query.skip ? Number(req.query.skip) : 0;
  const users = await UserModel.find(
    {
      $or: [
        {
          name: iLikeVietnamese(user as string),
        },
        {
          email: iLikeVietnamese(user as string),
        },
      ],
      user: { $nin: req.user._id },
    },
    undefined,
    { skip }
  )
    .select('avatar email name')
    .sort({ _id: -1 })
    .limit(MAX_SEARCH_RESULTS_PER_REQUEST);

  if (!users) {
    res
      .status(400)
      .json({ error: 'Cannot find those users. Please try again!' });
    return;
  }

  res.status(200).json(users);
  return;
};

// @desc    Find recipes by ingredient
// @route   GET /api/search
// @access  Private
export const findRecipesByIngredient = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.query.ingredient) {
    next();
    return;
  }

  const skip = req.query.skip ? Number(req.query.skip) : 0;
  const recipes = await RecipeModel.find(
    {
      'ingredients.title': iLikeVietnamese(req.query.ingredient as string),
      user: { $nin: req.user._id },
      isPublished: true,
    },
    undefined,
    { skip }
  )
    .select('title time image difficulty serve')
    .sort({ _id: -1 })
    .limit(MAX_SEARCH_RESULTS_PER_REQUEST);

  if (!recipes) {
    res
      .status(400)
      .json({ error: 'Cannot find those recipes. Please try again!' });
    return;
  }

  res.status(200).json(recipes);
  return;
};
