import { Schema, model } from 'mongoose';
import { MAX_LENGTH_255, MIN_LENGTH_6 } from '../config/validate';

interface User {
  email: string;
  name: string;
  password: string;
  avatar?: string;
}

const UserSchema = new Schema<User>({
  email: {
    type: String,
    unique: true,
    required: true,
    min: MIN_LENGTH_6,
    max: MAX_LENGTH_255,
  },
  name: {
    type: String,
    required: true,
    min: MIN_LENGTH_6,
    max: MAX_LENGTH_255,
  },
  avatar: {
    base64: String,
    imageFormat: String,
  },
  password: {
    type: String,
    required: true,
    min: MIN_LENGTH_6,
    max: MAX_LENGTH_255,
  },
});

const UserModel = model<User>('User', UserSchema);

export default UserModel;
