'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

export default function CurrencyCard() {
  const { data: session } = useSession()

  const user = session?.user
  return (
    <div className="flex flex-col">
      <div>Set your default currency for transactions</div>
      <div>Currency - {user?.currency}</div>
    </div>
  )
}
