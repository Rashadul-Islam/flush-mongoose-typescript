import { z } from 'zod';

const createOrderZodSchema = z.object({
  body: z.object({
    service: z.string({
      required_error: 'Service is required',
    }),
    user: z.string({
      required_error: 'User is required',
    }),
    status: z.string().optional(),
    transactionId: z.string({
      required_error: 'Transaction id is required',
    }),
  }),
});

const updateOrderZodSchema = z.object({
  body: z.object({
    service: z.string().optional(),
    user: z.string().optional(),
    status: z.string().optional(),
    transactionId: z.string().optional(),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
  updateOrderZodSchema,
};
