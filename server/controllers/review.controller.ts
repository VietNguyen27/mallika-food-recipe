import { Response } from 'express';
import RecipeModel from '../models/recipe.model';
import { IGetUserAuthInfoRequest } from '../utils/interfaces';

export const addNewReview = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  const { rating, comment } = req.body;

  try {
    let recipe = await RecipeModel.findById(req.params.recipeId);
    const alreadyReviewed = recipe.reviews.find(
      (review: any) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400).json({ error: 'You already reviewed!' });
      return;
    }

    const review = {
      rating,
      comment,
      user: req.user._id,
    };

    recipe.reviews.unshift(review);
    recipe.numReviews = recipe.reviews.length;
    recipe.rating = Number(
      (
        recipe.reviews.reduce((acc, item: any) => item.rating + acc, 0) /
        recipe.reviews.length
      ).toFixed(1)
    );

    await recipe.save();
    recipe = await recipe.populate('reviews.user', 'name avatar');

    res.status(200).json(recipe);
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

export const getAllReviews = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const recipe = await RecipeModel.findById(req.params.recipeId)
      .select('reviews')
      .populate('reviews.user', 'name avatar')
      .sort({ _id: -1 })
      .limit(6);

    if (!recipe) {
      res.status(400).json({
        error: 'Something went wrong while getting reviews!',
      });
      return;
    }

    res.status(200).json(recipe.reviews);
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

export const updateReview = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    let recipe = await RecipeModel.findOneAndUpdate(
      {
        _id: req.params.recipeId,
        'reviews._id': req.params.reviewId,
      },
      {
        $set: {
          'reviews.$.comment': req.body.comment,
          'reviews.$.rating': req.body.rating,
        },
      },
      { returnOriginal: false }
    ).populate('reviews.user', 'name avatar');

    if (!recipe) {
      res
        .status(400)
        .json({ error: 'Something went wrong while updating this recipe!' });
      return;
    }

    recipe.rating = Number(
      (
        recipe.reviews.reduce((acc, item: any) => item.rating + acc, 0) /
        recipe.reviews.length
      ).toFixed(1)
    );
    await recipe.save();

    res.status(200).json(recipe);
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

export const deleteReview = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    let recipe = await RecipeModel.findOneAndUpdate(
      {
        _id: req.params.recipeId,
        'reviews._id': req.params.reviewId,
      },
      {
        $pull: {
          reviews: { _id: req.params.reviewId },
        },
      },
      { returnOriginal: false }
    );
    if (!recipe) {
      res
        .status(400)
        .json({ error: 'Something went wrong while removing this review!' });
      return;
    }

    recipe.numReviews = recipe.reviews.length;
    recipe.rating =
      recipe.reviews.length > 0
        ? Number(
            (
              recipe.reviews.reduce((acc, item: any) => item.rating + acc, 0) /
              recipe.reviews.length
            ).toFixed(1)
          )
        : 0;

    await recipe.save();

    res.status(200).json(recipe);
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};
