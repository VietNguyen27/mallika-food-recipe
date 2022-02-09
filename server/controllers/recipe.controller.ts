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
    let recipe = await newRecipe.save();
    recipe = await recipe.populate('user', 'name avatar');

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
      .limit(4);

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

export const getMyRecipes = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const recipes = await RecipeModel.find({
      user: req.user._id,
    })
      .populate('user', 'name avatar')
      .sort({ _id: -1 });

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

export const getOtherUserRecipes = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const recipes = await RecipeModel.find({
      user: req.params.id,
    })
      .populate('user', 'name avatar')
      .sort({ _id: -1 });

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

export const getAllRecipes = async (
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
      .limit(6);

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

export const getMoreRecipes = async (
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
      .limit(6);

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
