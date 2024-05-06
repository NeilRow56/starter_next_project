import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import db from '@/lib/db'
import { redirect } from 'next/navigation'
import CreateTransactionDialog from '../_components/CreateTransactionDialog'
import Overview from '../_components/Overview'

export default async function DashboardPage() {
  const session = await auth()
  const user = session?.user

  if (!user) {
    redirect('/auth/sign-in')
  }

  const userDetails = await db.user.findUnique({
    where: {
      id: user.id,
    },
  })

  if (!userDetails) {
    redirect('/front-end/settings')
  }

  const userSettings = await db.userSettings.findFirst({
    where: {
      userId: user.id,
    },
  })

  return (
    <div className="h-full bg-background">
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <p className="text-3xl font-bold">Hello, {user.firstName}! 👋</p>

          <div className="flex items-center gap-3">
            <CreateTransactionDialog
              trigger={
                <Button
                  variant={'outline'}
                  className="border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white"
                >
                  New income 🤑
                </Button>
              }
              type="income"
            />

            <CreateTransactionDialog
              trigger={
                <Button
                  variant={'outline'}
                  className="border-rose-500 bg-rose-950 text-white hover:bg-rose-700 hover:text-white"
                >
                  New expense 😤
                </Button>
              }
              type="expense"
            />
          </div>
        </div>
      </div>
      <Overview userSettings={userSettings} />
    </div>
  )
}
