import { Button } from '../ui/button'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

function DashboardNavbar() {
  // Holding userId ready for auth
  const userId = 'Tommy'

  var myDate = new Date()
  var hrs = myDate.getHours()

  var greet

  if (hrs < 12) greet = 'Good Morning'
  else if (hrs >= 12 && hrs <= 17) greet = 'Good Afternoon'
  else if (hrs >= 17 && hrs <= 24) greet = 'Good Evening'

  return (
    <div className="flex h-14 w-full items-center border border-gray-600  bg-white  px-2 dark:bg-neutral-950 md:px-12  lg:px-48">
      <div className="justify-cstart flex flex-1">
        <div>
          <p className="text-xl text-primary">{greet}</p>
        </div>
      </div>
      <div className=" flex  gap-6">
        <ThemeToggle />
        {userId ? (
          <Button asChild size="sm" className="px-6  ">
            <Link href="/sign-in">User</Link>
          </Button>
        ) : (
          <Button asChild size="sm" className="px-6  ">
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </div>
    </div>
  )
}

export default DashboardNavbar
