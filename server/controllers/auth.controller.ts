import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs';
import UserModel, { IUser } from '../models/user.model';
import {
  loginValidation,
  registerValidation,
} from '../validations/auth.validation';
import {
  base64Encode,
  generateAccessToken,
  getRandomNumber,
} from '../utils/utils';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: IUser = req.body;
  const { error } = registerValidation(req.body);

  if (error) {
    res.status(400).json(error.details);
    return;
  }

  const emailExist = await UserModel.findOne({ email });
  if (emailExist) {
    res.status(400).json([
      {
        context: {
          label: 'email',
        },
        message: 'Email already registered!',
      },
    ]);
    return;
  }

  const salt: string = await bcrypt.genSalt(10);
  const hashedPassword: string = await bcrypt.hash(password, salt);

  try {
    const avatarFolder = './server/public/default-avatar';

    fs.readdir(avatarFolder, async (_, files) => {
      const randomAvatar = files[getRandomNumber(files.length)];
      const base64Image = base64Encode(`${avatarFolder}/${randomAvatar}`);

      const newUser = new UserModel({
        ...req.body,
        avatar: {
          imageFormat: randomAvatar.split('.').pop(),
          base64: base64Image,
        },
        password: hashedPassword,
      });

      const user = await newUser.save();
      if (!user)
        res
          .status(400)
          .json({ error: 'Something went wrong while creating your account' });
      return;
    });

    res.status(200).json({ email, password });
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

// @desc    Authenticate user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: IUser = req.body;
  const { error } = loginValidation(req.body);

  if (error) {
    res.status(400).json(error.details);
    return;
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(400).json([
      {
        context: {
          label: 'email',
        },
        message: "Email doesn't exists. Please try again!",
      },
    ]);
    return;
  }

  const isValidPassword: boolean = await bcrypt.compare(
    password,
    user.password
  );

  if (!isValidPassword) {
    res.status(400).json([
      {
        context: {
          label: 'password',
        },
        message: 'Password is incorrect!',
      },
    ]);
    return;
  }

  const accessToken = generateAccessToken(user._id);
  req.headers.authorization = 'Bearer ' + accessToken;

  res.status(200).json(accessToken);
  return;
};
