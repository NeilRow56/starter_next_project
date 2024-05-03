'use client'

import { ThemeToggle } from './ThemeToggle'
import { useSession } from 'next-auth/react'

import NavbarItem from './NavbarItem'
import UserButton from './UserButton'

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

  const items = [
    { label: 'Transactions', href: '/transactions' },
    { label: 'Manage', href: '/manage' },
  ]

  return (
    <div className=" hidden h-14 w-full items-center justify-between border border-gray-600 bg-white  px-2  dark:bg-neutral-950 md:px-6 lg:flex  ">
      <div className="flex  justify-start lg:gap-12">
        {/* <div className="relative flex items-center  ">
          <p className=" flex text-xl text-primary">{greet}</p>
        </div> */}
        {items.map((item) => (
          <NavbarItem key={item.href} href={item.href} label={item.label} />
        ))}
      </div>

      <div className=" flex items-center justify-end lg:gap-4 ">
        <ThemeToggle />

        <p className=" flex w-full text-xl text-primary">{greet}</p>
        <UserButton />
      </div>
    </div>
  )
}

export default DashboardNavbar
