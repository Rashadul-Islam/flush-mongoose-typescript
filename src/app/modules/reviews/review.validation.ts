import { z } from 'zod';

const createReviewZodSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: 'User id is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
  }),
});

const updateReviewZodSchema = z.object({
  body: z.object({
    user: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const ReviewValidation = {
  createReviewZodSchema,
  updateReviewZodSchema,
};
