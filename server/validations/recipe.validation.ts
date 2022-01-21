import Joi from 'joi';
import { MAX_LENGTH_1000, MAX_LENGTH_255 } from '../config/validate';

interface RecipeData {
  title: string;
  description: string;
  ingredients: object[];
  steps: object[];
}

export const recipeValidation = (body: RecipeData) => {
  const schema = Joi.object({
    title: Joi.string()
      .max(MAX_LENGTH_255)
      .required()
      .messages({
        'string.max': `Title are only allowed up to ${MAX_LENGTH_255} characters.`,
        'string.empty': 'Title is not allowed to be empty',
        'any.required': 'Title is required. Please enter a valid value!',
      }),
    time: Joi.object().keys({
      hour: Joi.number().max(720).required().messages({
        'number.base': 'Not a valid number',
        'number.min': 'Min of hour is 1',
        'number.max': 'Max of hour is 720',
      }),
      minute: Joi.number()
        .max(60)
        .required()
        .when('hour', {
          is: 0,
          then: Joi.number().min(1),
        })
        .messages({
          'number.base': 'Not a valid number',
          'number.min': 'Min of minute is 1',
          'number.max': 'Max of minute is 60',
        }),
    }),
    image: Joi.object()
      .keys({})
      .required()
      .min(1)
      .messages({
        'object.min': 'Please choose cover image',
      })
      .unknown(),
    description: Joi.string()
      .allow(null, '')
      .max(MAX_LENGTH_1000)
      .messages({
        'string.max': `Description are only allowed up to ${MAX_LENGTH_1000} characters.`,
      }),
    ingredients: Joi.array().min(1).messages({
      'array.min': 'Ingredients must contain at least 1 item.',
    }),
    steps: Joi.array().min(1).messages({
      'array.min': 'Steps must contain at least 1 item.',
    }),
    serve: Joi.number().min(1).max(100).required().messages({
      'number.base': 'Not a valid number',
      'number.min': 'Min of serve is 1',
      'number.max': 'Max of serve is 100',
    }),
  }).unknown();

  return schema.validate(body, { abortEarly: false });
};
