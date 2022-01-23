import { Request, Response } from 'express';
import LikedModel from '../models/liked.model';
import { IGetUserAuthInfoRequest } from '../utils/interfaces';

export const addLikedRecipe = async (
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

export const removeLikedRecipe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const recipe = await LikedModel.findOneAndDelete({
      recipe: {
        _id: req.params.id,
      },
    });
    if (!recipe) {
      res
        .status(400)
        .json({ error: 'Something went wrong while remove this recipe!' });
      return;
    }

    res.status(200).json(recipe._id);
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

export const getAllLikedRecipes = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const recipes = await LikedModel.find({ user: req.user._id })
      .populate('recipe', 'title time image difficulty serve')
      .sort({ _id: -1 })
      .limit(6);

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

export const getMoreLikedRecipes = async (
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
      .limit(6);

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
