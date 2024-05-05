import { auth } from '@/lib/auth'
import db from '@/lib/db'

import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function GET(request: Request) {
  const session = await auth()
  const user = session?.user

  if (!user) {
    redirect('/auth/sign-in')
  }

  const { searchParams } = new URL(request.url)
  const paramType = searchParams.get('type')

  const validator = z.enum(['expense', 'income']).nullable()

  const queryParams = validator.safeParse(paramType)
  if (!queryParams.success) {
    return Response.json(queryParams.error, {
      status: 400,
    })
  }

  const type = queryParams.data
  const categories = await db.category.findMany({
    where: {
      userId: user.id,
      ...(type && { type }), // include type in the filters if it's defined
    },
    orderBy: {
      name: 'asc',
    },
  })

  return Response.json(categories)
}
