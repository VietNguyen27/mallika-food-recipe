import mongoose, { Schema, Types } from 'mongoose';

interface IReview {
  user: Types.ObjectId;
  rating: number;
  comment: string;
}

const ReviewSchema = new Schema<IReview>(
  {
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default ReviewSchema;
