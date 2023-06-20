import { Response, Request } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { orderFilterableFields } from './order.constant';
import { OrderService } from './order.service';
import { IOrder } from './order.interface';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.createOrder(req.body);

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully !',
    data: result,
  });
});

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, orderFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await OrderService.getAllOrder(filters, paginationOptions);

  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getSingleOrder(req.params.id);
  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully !',
    data: result,
  });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.updateOrder(req.params.id, req.body);
  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order updated successfully !',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.deleteOrder(req.params.id);
  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order deleted successfully !',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
