import { z } from 'zod';
import { Gender, Role } from './user.constant';

const createUserZodSchema = z.object({
  body: z.object({
    role: z.enum([...Role] as [string, ...string[]]).optional(),
    password: z.string({
      required_error: 'Password is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    gender: z.enum([...Gender] as [string, ...string[]], {
      required_error: 'Gender is required',
    }),
    phone: z.string({
      required_error: 'Phone number is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    image: z.string().optional(),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    role: z.enum([...Role] as [string, ...string[]]).optional(),
    password: z.string().optional(),
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    gender: z.enum([...Gender] as [string, ...string[]]).optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    image: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
