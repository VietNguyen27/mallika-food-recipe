import mongoose, { Schema, Types, model } from 'mongoose';
import timeZone from 'mongoose-timezone';

export interface IUser {
  email: string;
  name: string;
  password?: string;
  avatar?: object;
  bio?: string;
  following: string[];
  numFollowing: number;
  followers: string[];
  numFollowers: number;
  numRecipes: number;
  firstLogin?: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      base64: String,
      imageFormat: String,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: '',
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    numFollowing: {
      type: Number,
      default: 0,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    numFollowers: {
      type: Number,
      default: 0,
    },
    numRecipes: {
      type: Number,
      default: 0,
    },
    firstLogin: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual('liked', {
  ref: 'Liked',
  localField: '_id',
  foreignField: 'user',
});

UserSchema.plugin(timeZone, { paths: ['createdAt', 'updatedAt'] });

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;
