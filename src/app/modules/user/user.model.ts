import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { Gender } from './user.constant';

export const UserSchema = new Schema<IUser, UserModel>(
  {
    role: {
      type: String,
      required: true,
      default: 'user',
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: Gender,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const User = model<IUser, UserModel>('User', UserSchema);
