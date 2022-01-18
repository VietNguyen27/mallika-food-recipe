import Joi from 'joi';
import { MAX_LENGTH_1000, MAX_LENGTH_255 } from '../config/validate';

interface Recipe {
  title: string;
  description: string;
  ingredients: object[];
  steps: object[];
}

export const recipeValidation = ({
  title,
  description,
  ingredients,
  steps,
}: Recipe) => {
  const schema = Joi.object({
    title: Joi.string()
      .max(MAX_LENGTH_255)
      .required()
      .messages({
        'string.max': `Title are only allowed up to ${MAX_LENGTH_255} characters.`,
        'string.empty': 'Title is not allowed to be empty',
        'any.required': 'Title is required. Please enter a valid value!',
      }),
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
  });

  return schema.validate(
    { title, description, ingredients, steps },
    { abortEarly: false }
  );
};
