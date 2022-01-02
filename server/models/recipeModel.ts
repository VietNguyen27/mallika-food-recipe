import mongoose, { Schema, model, Types } from 'mongoose';
import ReviewSchema from './reviewModel';

interface Recipe {
  user: Types.ObjectId;
  title: string;
  time: object;
  image: object;
  description: string;
  difficulty: number;
  serve: number;
  ingredients: object[];
  steps: object[];
  reviews: object[];
  isPublished: boolean;
}

const RecipeSchema = new Schema<Recipe>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    time: {
      hour: Number,
      minute: Number,
    },
    image: {
      base64: String,
      imageFormat: String,
    },
    description: {
      type: String,
    },
    difficulty: {
      type: Number,
      required: true,
    },
    serve: {
      type: Number,
      required: true,
    },
    ingredients: [
      {
        name: {
          type: String,
        },
        isItem: {
          type: Boolean,
        },
      },
    ],
    steps: [
      {
        name: {
          type: String,
        },
        isItem: {
          type: Boolean,
        },
      },
    ],
    reviews: [ReviewSchema],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const RecipeModel = model<Recipe>('Recipe', RecipeSchema);

export default RecipeModel;
