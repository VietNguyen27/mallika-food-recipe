import { Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';

export const getUser = async (req: Request, res: Response): Promise<void> => {
  if (req.headers && req.headers.authorization) {
    let authorization = req.headers.authorization.split(' ')[1];
    let decoded;

    try {
      decoded = jwt.verify(authorization, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ error: 'Access denied' });
    }

    const _id = decoded.id;
    const user = await UserModel.findById({ _id });

    return res.status(200).json(user);
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await UserModel.find().select('-password');

  return res.status(200).json(users);
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res
      .status(400)
      .json({ error: 'Cannot find this user. Please try again!' });

  const user = await UserModel.findById({ _id }).select('-password');

  if (!user)
    return res
      .status(400)
      .json({ error: 'Cannot find this user. Please try again!' });

  return res.status(200).json(user);
};
