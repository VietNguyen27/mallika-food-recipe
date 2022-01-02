import { Request, Reponse } from 'express';
import RecipeModel from '../models/recipeModel';
import { recipeValidation } from '../validations/recipeValidation';

export const addRecipe = async (req: Request, res: Reponse) => {
  const { error } = recipeValidation(req.body);

  if (error) return res.status(400).json(error.details);

  const newRecipe = new RecipeModel(req.body);

  try {
    const recipe = await newRecipe.save();
    if (!recipe)
      return res
        .status(400)
        .json({ error: 'Something went wrong while creating this recipe!' });
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getAllRecipes = async (req: Request, res: Reponse) => {
  try {
    const recipes = await RecipeModel.find({ user: { $nin: req.user._id } });

    if (!recipes)
      return res
        .status(400)
        .json({ error: 'Something went wrong while getting all recipes!' });
    return res.status(200).json(recipes);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getRecipeById = async (req: Request, res: Reponse) => {
  try {
    const recipe = await RecipeModel.findById(req.params.id);
    if (!recipe)
      return res
        .status(400)
        .json({ error: 'Something went wrong while getting this recipe!' });
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const updateRecipe = async (req: Request, res: Reponse) => {
  try {
    const recipe = await RecipeModel.findByIdAndUpdate(req.params.id, req.body);
    if (!recipe)
      return res
        .status(400)
        .json({ error: 'Something went wrong while updating this recipe!' });
    return res
      .status(200)
      .json({ message: 'Updated this recipe successfully!' });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const deleteRecipe = async (req: Request, res: Reponse) => {
  try {
    const recipe = await RecipeModel.findByIdAndDelete(req.params.id);
    if (!recipe)
      return res
        .status(400)
        .json({ error: 'Something went wrong while updating this recipe!' });
    return res
      .status(200)
      .json({ message: 'Deleted this recipe successfully!' });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
