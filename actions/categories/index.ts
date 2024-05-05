'use server'

import { auth } from '@/lib/auth'
import db from '@/lib/db'
import {
  CreateCategorySchema,
  CreateCategorySchemaType,
} from '@/schemas/categories'
import { redirect } from 'next/navigation'

export async function CreateCategory(form: CreateCategorySchemaType) {
  const parsedBody = CreateCategorySchema.safeParse(form)
  if (!parsedBody.success) {
    throw new Error('bad request')
  }

  const session = await auth()
  const user = session?.user

  if (!user) {
    redirect('/auth/sign-in')
  }

  const { name, icon, type } = parsedBody.data
  return await db.category.create({
    data: {
      userId: user.id,
      name,
      icon,
      type,
    },
  })
}
