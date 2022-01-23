import { Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';

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
    const user = await UserModel.findById({ _id }).select('-password');

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
  req: Request,
  res: Response
): Promise<void> => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(400).json({ error: 'Cannot find this user. Please try again!' });
    return;
  }

  const user = await UserModel.findById({ _id }).select('-password');

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
