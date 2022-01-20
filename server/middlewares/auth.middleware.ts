import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';
import { IGetUserAuthInfoRequest } from '../utils/interfaces';

export const auth = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req!.user = await UserModel.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(400).json({ error: 'Invalid token' });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Access denied' });
    return;
  }
};
