'use server'

import { auth } from '@/lib/auth'
import db from '@/lib/db'

import {
  CreateCategorySchema,
  CreateCategorySchemaType,
  DeleteCategorySchema,
  DeleteCategorySchemaType,
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

export async function DeleteCategory(form: DeleteCategorySchemaType) {
  const parsedBody = DeleteCategorySchema.safeParse(form)
  if (!parsedBody.success) {
    throw new Error('bad request')
  }

  const session = await auth()
  const user = session?.user

  if (!user) {
    redirect('/auth/sign-in')
  }

  return await db.category.delete({
    where: {
      name_userId_type: {
        userId: user.id,
        name: parsedBody.data.name,
        type: parsedBody.data.type,
      },
    },
  })
}
