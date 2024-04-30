'use client'

import { Button } from '../ui/button'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'
import { useSession } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut, Search } from 'lucide-react'

function DashboardNavbar() {
  // Holding userId ready for auth
  const { data: session } = useSession()

  const user = session?.user

  var myDate = new Date()
  var hrs = myDate.getHours()

  var greet

  if (hrs < 12) greet = 'Good Morning'
  else if (hrs >= 12 && hrs <= 17) greet = 'Good Afternoon'
  else if (hrs >= 17 && hrs <= 24) greet = 'Good Evening'

  return (
    <div className="flex h-14 w-full items-center justify-between border border-gray-600  bg-white  px-2 dark:bg-neutral-950 md:px-12  lg:px-24">
      <div className="flex  justify-start ">
        <div>
          <p className=" flex text-xl text-primary">{greet}</p>
        </div>
      </div>
      <div className="hidden items-center gap-x-2 rounded-md bg-zinc-100 px-3.5 py-1.5 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 md:flex">
        <Search className="h-4 w-4" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none placeholder:text-neutral-600 dark:placeholder:text-neutral-400 md:flex-1"
        />
      </div>
      <div className=" flex items-center  gap-4">
        <ThemeToggle />
        {user ? (
          <div className="flex w-full">
            <div className=" space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger className=" text-primary">
                  <Avatar className="mt-2 h-12 w-12">
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
            <div className="pt-4">
              <Button asChild size="sm" className="ml-4  px-6 ">
                <Link href="/login">{user.firstName}-active</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Button asChild size="sm" className="px-6  ">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardNavbar
