'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function CreatePage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/sign-in?callbackUrl=/create')
    },
  })
  return <div>Create Page</div>
}
