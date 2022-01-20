import { Request, Response } from 'express';
import RecipeModel from '../models/recipe.model';
import { IGetUserAuthInfoRequest } from '../utils/interfaces';
import { recipeValidation } from '../validations/recipe.validation';

export const addRecipe = async (req: Request, res: Response): Promise<void> => {
  const { error } = recipeValidation(req.body);

  if (error) {
    res.status(400).json(error.details);
    return;
  }

  const newRecipe = new RecipeModel(req.body);

  try {
    const recipe = await newRecipe.save();
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

export const getAllRecipes = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const recipes = await RecipeModel.find({ user: { $nin: req.user._id } });

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

export const getRecipeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const recipe = await RecipeModel.findById(req.params.id);
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

    res.status(200).json({ message: 'Updated this recipe successfully!' });
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

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