'use server'

import { auth } from '@/lib/auth'
import db from '@/lib/db'

import {
  CreateTransactionSchema,
  CreateTransactionSchemaType,
} from '@/schemas/transactions'

import { redirect } from 'next/navigation'

export async function CreateTransaction(form: CreateTransactionSchemaType) {
  const parsedBody = CreateTransactionSchema.safeParse(form)
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message)
  }

  const session = await auth()
  const user = session?.user

  if (!user) {
    redirect('/auth/sign-in')
  }

  const { amount, category, date, description, type } = parsedBody.data
  const categoryRow = await db.category.findFirst({
    where: {
      userId: user.id,
      name: category,
    },
  })

  if (!categoryRow) {
    throw new Error('category not found')
  }

  // NOTE: don't make confusion between $transaction ( prisma ) and prisma.transaction (table)

  await db.$transaction([
    // Create user transaction
    db.transaction.create({
      data: {
        userId: user.id,
        amount,
        date,
        description: description || '',
        type,
        category: categoryRow.name,
        categoryIcon: categoryRow.icon,
      },
    }),

    // // Update month aggregate table
    // db.monthHistory.upsert({
    //   where: {
    //     day_month_year_userId: {
    //       userId: user.id,
    //       day: date.getUTCDate(),
    //       month: date.getUTCMonth(),
    //       year: date.getUTCFullYear(),
    //     },
    //   },
    //   create: {
    //     userId: user.id,
    //     day: date.getUTCDate(),
    //     month: date.getUTCMonth(),
    //     year: date.getUTCFullYear(),
    //     expense: type === 'expense' ? amount : 0,
    //     income: type === 'income' ? amount : 0,
    //   },
    //   update: {
    //     expense: {
    //       increment: type === 'expense' ? amount : 0,
    //     },
    //     income: {
    //       increment: type === 'income' ? amount : 0,
    //     },
    //   },
    // }),

    // // Update year aggreate
    // db.yearHistory.upsert({
    //   where: {
    //     month_year_userId: {
    //       userId: user.id,
    //       month: date.getUTCMonth(),
    //       year: date.getUTCFullYear(),
    //     },
    //   },
    //   create: {
    //     userId: user.id,
    //     month: date.getUTCMonth(),
    //     year: date.getUTCFullYear(),
    //     expense: type === 'expense' ? amount : 0,
    //     income: type === 'income' ? amount : 0,
    //   },
    //   update: {
    //     expense: {
    //       increment: type === 'expense' ? amount : 0,
    //     },
    //     income: {
    //       increment: type === 'income' ? amount : 0,
    //     },
    //   },
    // }),
  ])
}
