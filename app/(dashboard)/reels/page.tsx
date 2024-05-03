import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function ReelsPage() {
  const session = await auth()
  if (!session) {
    redirect('/auth/sign-in?callbackUrl=/reels')
  }
  return <div>Reels Page</div>
}
