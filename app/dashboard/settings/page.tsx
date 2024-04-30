import { SettingsForm } from '@/components/settings/SettingsForm'

import { auth } from '@/lib/auth'
import { notFound } from 'next/navigation'

export default async function SettingsPage() {
  const session = await auth()
  const user = session?.user

  if (!user) {
    notFound()
  }

  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl text-primary md:text-4xl">Settings</h1>
          <p className="text-lg text-muted-foreground">Your Profile Settings</p>
        </div>
      </div>
      <div className="flex h-full items-center justify-center bg-background text-center">
        <div className="flex items-center gap-4">
          <SettingsForm user={user} />
        </div>
      </div>
    </div>
  )
}
