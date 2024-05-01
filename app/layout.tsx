import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ToastContainer } from 'react-toastify'

import { auth } from '@/lib/auth'
import db from '@/lib/db'
import RootProviders from '@/RootProviders/RootPtoviders'
import { AuthProvider } from '@/providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Accounts Pack - small',
  description: 'Working papers accounts pack - small',
}

async function getData(userId: string) {
  if (userId) {
    const data = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        colorScheme: true,
      },
    })
    return data
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const user = session?.user
  const data = await getData(user?.id as string)

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${inter.className} ${data?.colorScheme ?? 'theme-orange'}`}
      >
        <AuthProvider>
          <RootProviders>
            {children}
            <ToastContainer
              position="bottom-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </RootProviders>
        </AuthProvider>
      </body>
    </html>
  )
}
