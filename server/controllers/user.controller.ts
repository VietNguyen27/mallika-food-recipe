import { Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';
import { IGetUserAuthInfoRequest } from '../utils/interfaces';

const MAX_USERS_FOLLOW_PER_REQUEST = 8;

export const getUser = async (req: Request, res: Response): Promise<void> => {
  if (req.headers && req.headers.authorization) {
    let authorization = req.headers.authorization.split(' ')[1];
    let decoded;

    try {
      decoded = jwt.verify(authorization, process.env.JWT_SECRET);
    } catch (error) {
      res.status(401).json({ error: 'Access denied' });
      return;
    }

    const _id = decoded.id;
    const user = await UserModel.findById(_id).select('-password');

    res.status(200).json(user);
    return;
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await UserModel.find().select('-password');

  res.status(200).json(users);
  return;
};

export const getUserById = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: 'Cannot find this user. Please try again!' });
    return;
  }

  const user = await UserModel.findById(id).select('-password');

  if (!user) {
    res.status(400).json({ error: 'Cannot find this user. Please try again!' });
    return;
  }

  res.status(200).json(user);
  return;
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body);

    if (!user) {
      res
        .status(400)
        .json({ error: 'Something went wrong while updating this user!' });
      return;
    }

    res.status(200).json(req.body);
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

export const fetchFollowersByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const skip = req.query.skip ? Number(req.query.skip) : 0;
  const user = await UserModel.findOne(
    { _id: req.params.id },
    {
      followers: { $slice: [skip, MAX_USERS_FOLLOW_PER_REQUEST] },
    }
  ).populate({
    path: 'followers',
    model: 'User',
    select: 'avatar email name',
  });

  if (!user) {
    res.status(400).json({
      error: 'Cannot find followers from this user. Please try again!',
    });
    return;
  }

  const { _id, followers } = user;

  res.status(200).json({
    _id,
    followers,
  });
  return;
};

export const fetchFollowingByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const skip = req.query.skip ? Number(req.query.skip) : 0;
  const user = await UserModel.findOne(
    { _id: req.params.id },
    {
      following: { $slice: [skip, MAX_USERS_FOLLOW_PER_REQUEST] },
    }
  ).populate({
    path: 'following',
    model: 'User',
    select: 'avatar email name',
  });

  if (!user) {
    res.status(400).json({
      error: 'Cannot find following from this user. Please try again!',
    });
    return;
  }

  const { _id, following } = user;

  res.status(200).json({
    _id,
    following,
  });
  return;
};
