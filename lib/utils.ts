import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { auth } from './auth'
import db from './db'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUserId = async () => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    throw new Error('You must be signed in to use this feature')
  }

  return userId
}
