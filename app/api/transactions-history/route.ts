import { auth } from '@/lib/auth'
import db from '@/lib/db'
import { GetFormatterForCurrency } from '@/lib/helpers'
import { OverviewQuerySchema } from '@/schemas/overview'

import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const session = await auth()
  const user = session?.user

  if (!user) {
    redirect('/auth/sign-in')
  }

  const { searchParams } = new URL(request.url)
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const queryParams = OverviewQuerySchema.safeParse({
    from,
    to,
  })

  if (!queryParams.success) {
    return Response.json(queryParams.error.message, {
      status: 400,
    })
  }

  const transactions = await getTransactionsHistory(
    user.id,
    queryParams.data.from,
    queryParams.data.to
  )

  return Response.json(transactions)
}

export type GetTransactionHistoryResponseType = Awaited<
  ReturnType<typeof getTransactionsHistory>
>

async function getTransactionsHistory(userId: string, from: Date, to: Date) {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
  })
  if (!user) {
    throw new Error('user settings not found')
  }

  const formatter = GetFormatterForCurrency(user.currency)

  const transactions = await db.transaction.findMany({
    where: {
      userId,
      date: {
        gte: from,
        lte: to,
      },
    },
    orderBy: {
      date: 'desc',
    },
  })

  return transactions.map((transaction) => ({
    ...transaction,
    // lets format the amount with the user currency
    formattedAmount: formatter.format(transaction.amount),
  }))
}
