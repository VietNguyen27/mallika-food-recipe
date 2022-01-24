import { NextFunction, Response } from 'express';
import { IGetUserAuthInfoRequest } from '../utils/interfaces';
import RecipeModel from '../models/recipe.model';
import UserModel from '../models/user.model';

export const searchRecipesByTitle = async (
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
      title: { $regex: req.query.title, $options: 'i' },
      user: { $nin: req.user._id },
      isPublished: true,
    },
    undefined,
    { skip }
  )
    .select('title time image difficulty serve')
    .sort({ _id: -1 })
    .limit(6);

  if (!recipes) {
    res
      .status(400)
      .json({ error: 'Cannot find those recipes. Please try again!' });
    return;
  }

  res.status(200).json(recipes);
  return;
};

export const searchUsers = async (
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
          name: { $regex: user, $options: 'i' },
        },
        {
          email: { $regex: user, $options: 'i' },
        },
      ],
      user: { $nin: req.user._id },
    },
    undefined,
    { skip }
  )
    .select('avatar email name')
    .sort({ _id: -1 })
    .limit(6);

  if (!users) {
    res
      .status(400)
      .json({ error: 'Cannot find those users. Please try again!' });
    return;
  }

  res.status(200).json(users);
  return;
};

export const searchRecipesByIngredient = async (
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
      'ingredients.title': { $regex: req.query.ingredient, $options: 'i' },
      user: { $nin: req.user._id },
      isPublished: true,
    },
    undefined,
    { skip }
  )
    .select('title time image difficulty serve')
    .sort({ _id: -1 })
    .limit(6);

  if (!recipes) {
    res
      .status(400)
      .json({ error: 'Cannot find those recipes. Please try again!' });
    return;
  }

  res.status(200).json(recipes);
  return;
};
