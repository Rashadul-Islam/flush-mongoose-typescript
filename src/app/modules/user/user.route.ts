import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.get('/:id', UserController.getSingleUser);

router.get('/', UserController.getAllUser);

router.delete('/:id', UserController.deleteUser);

router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);

export const UserRoutes = router;
