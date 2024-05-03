import { auth } from '@/lib/auth'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const session = await auth()
  const user = session?.user

  if (!user) {
    redirect('/auth/sign-in')
  }

  let userSettings = await db.userSettings.findUnique({
    where: {
      id: user.id,
    },
  })

  if (!userSettings) {
    userSettings = await db.userSettings.create({
      data: {
        userId: user.id,
        currency: 'GBP',
      },
    })
  }

  // Revalidate the home page that uses the user currency
  revalidatePath('front-end//dashboard')
  return Response.json(userSettings)
}
