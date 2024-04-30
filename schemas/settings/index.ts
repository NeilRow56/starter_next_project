import * as z from 'zod'

export const SettingsSchema = z.object({
  id: z.string(),
  email: z.string().email({
    message: 'Email is required',
  }),
  firstName: z.string().min(1, {
    message: 'Minimum 1 character required',
  }),
  lastName: z.string().min(1, {
    message: 'Minimum 1 character required',
  }),

  colorScheme: z.string().optional(),
})
