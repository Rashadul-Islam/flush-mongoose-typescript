/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IService, IServiceFilters } from './service.interface';
import { Service } from './service.model';
import { serviceSearchableFields } from './service.constant';

const createService = async (service: IService): Promise<IService | null> => {
  const result = await Service.create(service);

  return result;
};

const getAllService = async (
  filters: IServiceFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IService[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: serviceSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Service.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Service.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleService = async (id: string): Promise<IService | null> => {
  const result = await Service.findById(id);
  return result;
};

const updateService = async (
  id: string,
  payload: Partial<IService>
): Promise<IService | null> => {
  const isExist = await Service.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found !');
  }

  const result = await Service.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteService = async (id: string): Promise<IService | null> => {
  const result = await Service.findByIdAndDelete(id);

  return result;
};

export const ServiceService = {
  createService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,
};
