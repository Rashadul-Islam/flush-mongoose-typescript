import { Response, Request } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { ServiceService } from './service.service';
import { IService } from './service.interface';
import { serviceFilterableFields } from './service.constant';

const createService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.createService(req.body);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service created successfully !',
    data: result,
  });
});

const getAllService = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ServiceService.getAllService(filters, paginationOptions);

  sendResponse<IService[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service created successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.getSingleService(req.params.id);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service retrieved successfully !',
    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.updateService(req.params.id, req.body);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully !',
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.deleteService(req.params.id);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully !',
    data: result,
  });
});

export const ServiceController = {
  createService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,
};
