import { Request, Response } from 'express';
import LikedModel from '../models/liked.model';
import { IGetUserAuthInfoRequest } from '../utils/interfaces';

const MAX_LIKED_RECIPES_PER_REQUEST = 8;

// @desc    Add new liked recipe
// @route   POST /api/liked
// @access  Private
export const setLikedRecipe = async (
  req: Request,
  res: Response
): Promise<void> => {
  const likedRecipe = new LikedModel(req.body);

  try {
    let recipe = await likedRecipe.save();
    recipe = await recipe.populate(
      'recipe',
      'title time image difficulty serve'
    );

    if (!recipe) {
      res
        .status(400)
        .json({ error: 'Something went wrong while liked this recipe!' });
      return;
    }

    res.status(200).json(recipe);
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

// @desc    Delete liked recipe
// @route   DELETE /api/liked/:id
// @access  Private
export const deleteLikedRecipe = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const recipe = await LikedModel.findOneAndDelete({
      recipe: req.params.id,
      user: req.user._id,
    });
    if (!recipe) {
      res
        .status(400)
        .json({ error: 'Something went wrong while delete this recipe!' });
      return;
    }

    res.status(200).json(recipe.recipe);
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

// @desc    Get all liked recipes
// @route   GET /api/liked/all
// @access  Private
export const getAllLikedRecipes = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const recipes = await LikedModel.find(
      {
        user: req.user._id,
      },
      undefined,
      { skip }
    )
      .populate('recipe', 'title time image difficulty serve')
      .sort({ _id: -1 })
      .limit(MAX_LIKED_RECIPES_PER_REQUEST);

    if (!recipes) {
      res.status(400).json({
        error: 'Something went wrong while getting all liked recipes!',
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
