import { z } from 'zod';

const createServiceZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    image: z.string().optional(),
  }),
});

const UpdateServiceZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    price: z.number().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const ServiceValidation = {
  createServiceZodSchema,
  UpdateServiceZodSchema,
};
