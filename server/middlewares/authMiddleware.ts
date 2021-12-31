import jwt from 'jsonwebtoken';
import { Request, Response, Next } from 'express';
import UserModel from '../models/userModel';

export const auth = async (
  req: Request,
  res: Response,
  next: Next
): Promise<void> => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await UserModel.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      return res.status(400).json({ error: 'Invalid token' });
    }
  }

  if (!token) return res.status(401).json({ message: 'Access denied' });
};
