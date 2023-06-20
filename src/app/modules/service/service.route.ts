import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidation } from './service.validation';
import { ServiceController } from './service.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(ServiceValidation.createServiceZodSchema),
  ServiceController.createService
);

router.get('/:id', ServiceController.getSingleService);

router.get('/', ServiceController.getAllService);

router.delete('/:id', ServiceController.deleteService);

router.patch(
  '/:id',
  validateRequest(ServiceValidation.UpdateServiceZodSchema),
  ServiceController.updateService
);

export const ServiceRoutes = router;
