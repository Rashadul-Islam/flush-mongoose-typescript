import { Model } from 'mongoose';

export type IService = {
  name: string;
  price: number;
  description: string;
  image?: string;
};

export type ServiceModel = Model<IService, Record<string, unknown>>;

export type IServiceFilters = {
  searchTerm?: string;
  price?: string;
};
