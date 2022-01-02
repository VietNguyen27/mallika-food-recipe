import mongoose, { Schema, Types } from 'mongoose';

interface Review {
  user: Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
}

const ReviewSchema = new Schema<Review>(
  {
    name: {
      type: String,
      required: true,
    },
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
