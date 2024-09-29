import { z } from 'zod'

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be a string',
      })
      .min(1, 'Name is required'),
    email: z.string({
      invalid_type_error: 'Email must be a string',
    }),
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password cannot exceed 20 characters'),
    phone: z
      .string({
        invalid_type_error: 'Phone number must be a string',
      })
      .min(10, 'Phone number must be at least 10 characters')
      .max(15, 'Phone number cannot exceed 15 characters'),
    role: z
      .enum(['admin', 'user'], {
        invalid_type_error: 'Role must be either "admin" or "user"',
      })
      .default('user'),
    address: z
      .string({
        invalid_type_error: 'Address must be a string',
      })
      .optional(),
  }),
})

export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be a string',
      })
      .min(1, 'Name is required')
      .optional(), // Optional field

    email: z
      .string({
        invalid_type_error: 'Email must be a string',
      })
      .email('Invalid email address')
      .optional(), // Optional field

    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password cannot exceed 20 characters')
      .optional(), // Optional field

    phone: z
      .string({
        invalid_type_error: 'Phone number must be a string',
      })
      .min(10, 'Phone number must be at least 10 characters')
      .max(15, 'Phone number cannot exceed 15 characters')
      .optional(), // Optional field

    role: z
      .enum(['admin', 'user'], {
        invalid_type_error: 'Role must be either "admin" or "user"',
      })
      .optional(), // Optional field

    address: z
      .string({
        invalid_type_error: 'Address must be a string',
      })
      .min(1, 'Address is required')
      .optional(), // Optional field

    avatar: z
      .string({
        invalid_type_error: 'Avatar must be a string (URL or path)',
      })
      .optional(), // Optional field for avatar
  }),
})

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
}
