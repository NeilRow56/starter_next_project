'use client'

import { useSession } from 'next-auth/react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function UserButton() {
  const { data: session } = useSession()

  const user = session?.user
  return (
    <>
      {user ? (
        <div className="flex w-full">
          <div className=" pr-4">
            <DropdownMenu>
              <DropdownMenuTrigger className=" text-primary">
                <Avatar className="mt-2 h-11 w-11">
                  <AvatarImage src="/profile.jpg" />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <h2>{user.email}</h2>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/edgestore">edgestore</Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="menuItem" onClick={() => {}}>
                  <Link
                    className="flex items-center gap-2 text-lg text-sky-500 transition-colors hover:text-sky-600"
                    href={'/api/auth/signout'}
                  >
                    <LogOut size={20} />
                    Sign Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden pr-4 pt-3 lg:flex">
            <Button asChild size="sm" className="ml-4  px-4 ">
              <Link href="/login">{user.firstName}-active</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="">
          <Button asChild size="sm" className="px-4  ">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      )}
    </>
  )
}
