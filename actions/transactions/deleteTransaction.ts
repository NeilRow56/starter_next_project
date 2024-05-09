'use server'

import { auth } from '@/lib/auth'
import db from '@/lib/db'

import { redirect } from 'next/navigation'

export async function DeleteTransaction(id: string) {
  const session = await auth()
  const user = session?.user

  if (!user) {
    redirect('/auth/sign-in')
  }

  const transaction = await db.transaction.findUnique({
    where: {
      userId: user.id,
      id,
    },
  })

  if (!transaction) {
    throw new Error('bad request')
  }

  await db.$transaction([
    // Delete transaction from db
    db.transaction.delete({
      where: {
        id,
        userId: user.id,
      },
    }),
    // Update month history

    // Update year history
  ])
}
