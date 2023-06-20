import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IReview = {
  user: Types.ObjectId | IUser;
  description: string;
};

export type ReviewModel = Model<IReview, Record<string, unknown>>;
