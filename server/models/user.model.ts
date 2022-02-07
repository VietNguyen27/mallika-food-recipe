import { Schema, model } from 'mongoose';
import timeZone from 'mongoose-timezone';

export interface IUser {
  email: string;
  name: string;
  password?: string;
  avatar?: object;
  bio?: string;
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
