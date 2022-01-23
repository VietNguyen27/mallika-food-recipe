import mongoose, { Schema, Types, model } from 'mongoose';

export interface ILiked {
  recipe: Types.ObjectId;
  user: Types.ObjectId;
}

const LikedSchema = new Schema<ILiked>({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Recipe',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const LikedModel = model<ILiked>('Liked', LikedSchema);

export default LikedModel;
