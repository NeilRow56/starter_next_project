'use server'

import db from '@/lib/db'
import { getUserId } from '@/lib/utils'
import { UpdateUserCurrencySchema } from '@/schemas/userSettings'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function UpdateUserCurrency(
  values: z.infer<typeof UpdateUserCurrencySchema>
) {
  const userId = await getUserId()

  if (!userId) {
    redirect('/sign-in')
  }

  const validatedFields = UpdateUserCurrencySchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Currency.',
    }
  }

  const { currency, id } = validatedFields.data

  const userSettings = await db.userSettings.findUnique({
    where: {
      id,
    },
  })

  if (!userSettings) {
    throw new Error('User Settings not found')
  }

  try {
    await db.userSettings.update({
      where: {
        id: id,
        userId: userId,
      },
      data: {
        currency,
      },
    })
  } catch (error) {
    return { message: 'Database Error: Failed to Update Currency.' }
  }
}
