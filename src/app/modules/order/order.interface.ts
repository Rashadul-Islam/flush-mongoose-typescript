import { Model, Types } from 'mongoose';
import { IService } from '../service/service.interface';
import { IUser } from '../user/user.interface';

export type IOrder = {
  service: Types.ObjectId | IService;
  user: Types.ObjectId | IUser;
  status?: 'need action' | 'on going' | 'done';
  transactionId: string;
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;

export type IOrderFilters = {
  searchTerm?: string;
  status?: string;
};
