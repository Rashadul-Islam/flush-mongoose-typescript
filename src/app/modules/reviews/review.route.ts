import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';
import { ReviewController } from './review.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReview
);

router.get('/:id', ReviewController.getSingleReview);

router.get('/', ReviewController.getAllReview);

router.delete('/:id', ReviewController.deleteReview);

router.patch(
  '/:id',
  validateRequest(ReviewValidation.updateReviewZodSchema),
  ReviewController.updateReview
);

export const ReviewsRoutes = router;
