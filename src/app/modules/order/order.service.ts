/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IOrder, IOrderFilters } from './order.interface';
import { orderFilterableFields } from './order.constant';
import { Order } from './order.model';

const createOrder = async (payload: IOrder): Promise<IOrder | null> => {
  const newOrder = await Order.create(payload);

  let result = null;

  if (newOrder) {
    result = await Order.findById(newOrder._id)
      .populate('user')
      .populate('service');
  }
  return result;
};

const getAllOrder = async (
  filters: IOrderFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IOrder[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: orderFilterableFields.map(field => ({
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

  const result = await Order.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Order.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findById(id);
  return result;
};

const updateOrder = async (
  id: string,
  payload: Partial<IOrder>
): Promise<IOrder | null> => {
  const isExist = await Order.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found !');
  }

  const result = await Order.findOneAndUpdate({ id }, payload, {
    new: true,
  });

  return result;
};

const deleteOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findByIdAndDelete(id);

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
