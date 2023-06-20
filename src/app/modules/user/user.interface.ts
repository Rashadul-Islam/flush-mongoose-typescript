import { Model } from 'mongoose';

export type IUser = {
  role: 'admin' | 'user';
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  gender: 'male' | 'female';
  phone: string;
  email: string;
  image?: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUserFilters = {
  searchTerm?: string;
  phone?: string;
  email?: string;
  role?: string;
};
