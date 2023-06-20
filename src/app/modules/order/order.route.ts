import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
);

router.get('/:id', OrderController.getSingleOrder);

router.get('/', OrderController.getAllOrder);

router.delete('/:id', OrderController.deleteOrder);

router.patch(
  '/:id',
  validateRequest(OrderValidation.updateOrderZodSchema),
  OrderController.updateOrder
);

export const OrdersRoutes = router;
