import { Schema, model } from 'mongoose';

export interface User {
  email: string;
  name: string;
  password?: string;
  avatar?: object;
  bio?: string;
}

const UserSchema = new Schema<User>(
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
  },
  {
    timestamps: true,
  }
);

const UserModel = model<User>('User', UserSchema);

export default UserModel;
