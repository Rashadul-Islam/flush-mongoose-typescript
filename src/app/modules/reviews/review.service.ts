/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IReview } from './review.interface';
import { Review } from './review.model';
import { SortOrder } from 'mongoose';

const createReview = async (payload: IReview): Promise<IReview | null> => {
  const newReview = await Review.create(payload);

  let result = null;

  if (newReview) {
    result = await Review.findById(newReview._id).populate('user');
  }
  return result;
};

const getAllReview = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IReview[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Review.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Review.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleReview = async (id: string): Promise<IReview | null> => {
  const result = await Review.findById(id);
  return result;
};

const updateReview = async (
  id: string,
  payload: Partial<IReview>
): Promise<IReview | null> => {
  const isExist = await Review.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found !');
  }

  const result = await Review.findOneAndUpdate({ id }, payload, {
    new: true,
  });

  return result;
};

const deleteReview = async (id: string): Promise<IReview | null> => {
  const result = await Review.findByIdAndDelete(id);

  return result;
};

export const ReviewService = {
  createReview,
  getAllReview,
  getSingleReview,
  updateReview,
  deleteReview,
};
