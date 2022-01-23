import mongoose, { Schema, model, Types } from 'mongoose';
import ReviewSchema from './review.model';

export interface IRecipe {
  user: Types.ObjectId;
  title: string;
  time: object;
  image: object;
  description: string;
  difficulty: number;
  category: number;
  serve: number;
  ingredients: object[];
  steps: object[];
  reviews: object[];
  rating: number;
  numReviews: number;
  likedCount: number;
  likes: string[];
  isPublished: boolean;
}

export const RecipeSchema = new Schema<IRecipe>(
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
    category: {
      type: Number,
      required: true,
    },
    serve: {
      type: Number,
      required: true,
    },
    ingredients: [
      {
        title: {
          type: String,
        },
        isHeader: {
          type: Boolean,
          default: false,
        },
        _id: false,
      },
    ],
    steps: [
      {
        title: {
          type: String,
        },
        isHeader: {
          type: Boolean,
          default: false,
        },
        _id: false,
      },
    ],
    reviews: [ReviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    likedCount: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const RecipeModel = model<IRecipe>('Recipe', RecipeSchema);

export default RecipeModel;
