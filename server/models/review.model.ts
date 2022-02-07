import mongoose, { Schema, Types } from 'mongoose';
import timeZone from 'mongoose-timezone';

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

ReviewSchema.plugin(timeZone, { paths: ['createdAt', 'updatedAt'] });

export default ReviewSchema;
