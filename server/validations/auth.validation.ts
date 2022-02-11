import Joi from 'joi';
import { MAX_LENGTH_255, MIN_LENGTH_6 } from '../config/validate';

interface RegisterData {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const registerValidation = (body: RegisterData) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(MIN_LENGTH_6)
      .max(MAX_LENGTH_255)
      .email()
      .required()
      .messages({
        'string.email': 'Not a valid email address. Please check again!',
        'string.min': `Email must be between ${MIN_LENGTH_6} and ${MAX_LENGTH_255} characters.`,
        'string.max': `Email must be between ${MIN_LENGTH_6} and ${MAX_LENGTH_255} characters.`,
        'string.empty': 'Email is not allowed to be empty',
        'any.required': 'Email is required. Please enter a valid value!',
      }),
    name: Joi.string()
      .max(MAX_LENGTH_255)
      .required()
      .messages({
        'string.max': `Username must be between ${MIN_LENGTH_6} and ${MAX_LENGTH_255} characters.`,
        'string.empty': 'Username is not allowed to be empty',
        'any.required': 'Username is required. Please enter a valid value!',
      }),
    password: Joi.string()
      .min(MIN_LENGTH_6)
      .max(MAX_LENGTH_255)
      .required()
      .messages({
        'string.min': `Password must be between ${MIN_LENGTH_6} and ${MAX_LENGTH_255} characters.`,
        'string.max': `Password must be between ${MIN_LENGTH_6} and ${MAX_LENGTH_255} characters.`,
        'string.empty': 'Password is not allowed to be empty',
        'any.required': 'Password is required. Please enter a valid value!',
      }),
    password_confirmation: Joi.string()
      .equal(Joi.ref('password'))
      .required()
      .messages({
        'any.only': 'Confirmation password does not match!',
        'string.empty': 'Confirmation password is not allowed to be empty',
        'any.required': 'Confirmation password is required!',
      }),
  });

  return schema.validate(body, { abortEarly: false });
};

export const loginValidation = (body: LoginData) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(MIN_LENGTH_6)
      .max(MAX_LENGTH_255)
      .email()
      .required()
      .messages({
        'string.email': 'Not a valid email address. Please check again!',
        'string.min': `Email must be between ${MIN_LENGTH_6} and ${MAX_LENGTH_255} characters.`,
        'string.max': `Email must be between ${MIN_LENGTH_6} and ${MAX_LENGTH_255} characters.`,
        'string.empty': 'Email is not allowed to be empty',
        'any.required': 'Email is required. Please enter a valid value!',
      }),
    password: Joi.string()
      .min(MIN_LENGTH_6)
      .max(MAX_LENGTH_255)
      .required()
      .messages({
        'string.min': `Password must be between ${MIN_LENGTH_6} and ${MAX_LENGTH_255} characters.`,
        'string.max': `Password must be between ${MIN_LENGTH_6} and ${MAX_LENGTH_255} characters.`,
        'string.empty': 'Password is not allowed to be empty',
        'any.required': 'Password is required. Please enter a valid value!',
      }),
  });

  return schema.validate(body, { abortEarly: false });
};
