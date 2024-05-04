'use server'

import db from '@/lib/db'
import { getUserId } from '@/lib/utils'
import { SettingsSchema } from '@/schemas/settings'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function updateUser(values: z.infer<typeof SettingsSchema>) {
  const userId = await getUserId()
  const validatedFields = SettingsSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, firstName, lastName, colorScheme, currency } =
    validatedFields.data

  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
        firstName,
        lastName,
        colorScheme,
        currency,
      },
    })
    revalidatePath('/dashboard')
    return { success: 'Updated Settings.' }
  } catch (error) {
    return { message: 'Database Error: Failed to Update Settings.' }
  }
}
