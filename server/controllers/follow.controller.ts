import { Response } from 'express';
import UserModel from '../models/user.model';
import { IGetUserAuthInfoRequest } from '../utils/interfaces';

export const followUser = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: req.user._id },
      {
        $inc: { numFollowing: 1 },
        $push: {
          following: req.params.id,
        },
      },
      { returnOriginal: false }
    );
    const followedUser = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: { numFollowers: 1 },
        $push: {
          followers: req.user._id,
        },
      },
      { returnOriginal: false }
    );

    if (!user && !followedUser) {
      res
        .status(400)
        .json({ error: 'Something went wrong while follow this user!' });
      return;
    }

    res.status(200).json({
      user,
      followedUser: {
        ...followedUser.toObject(),
        isFollowing: true,
      },
    });
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

export const unfollowUser = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await UserModel.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      {
        $inc: { numFollowing: -1 },
        $pull: {
          following: req.params.id,
        },
      },
      { returnOriginal: false }
    );
    const followedUser = await UserModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $inc: { numFollowers: -1 },
        $pull: {
          followers: req.user._id,
        },
      },
      { returnOriginal: false }
    );

    if (!user) {
      res
        .status(400)
        .json({ error: 'Something went wrong while follow this user!' });
      return;
    }

    res.status(200).json({
      user,
      followedUser: {
        ...followedUser.toObject(),
        isFollowing: false,
      },
    });
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};
