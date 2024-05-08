'use client'

import {
  BookDashed,
  Clapperboard,
  Cog,
  Compass,
  Heart,
  Home,
  MessageCircle,
  PlusSquare,
  Search,
} from 'lucide-react'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'

const links = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/front-end/dashboard', icon: BookDashed },
  {
    name: 'Search',
    href: '/front-end/search',
    icon: Search,
    hideOnMobile: true,
  },
  { name: 'Services', href: '/front-end/services', icon: Compass },
  {
    name: 'Manage',
    href: '/front-end/manage',
    icon: Clapperboard,
    hideOnMobile: true,
  },
  {
    name: 'Messages',
    href: '/front-end/messages',
    icon: MessageCircle,
  },
  {
    name: 'Notifications',
    href: '/front-end/notifications',
    icon: Heart,
    hideOnMobile: true,
  },
  {
    name: 'Create',
    href: '/front-end/create',
    icon: PlusSquare,
  },
  {
    name: 'Settings',
    href: '/front-end/settings',
    icon: Cog,
  },
]

function NavLinks() {
  const pathname = usePathname()

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon
        const isActive = pathname === link.href

        return (
          <Link
            key={link.name}
            href={link.href}
            className={buttonVariants({
              variant: isActive ? 'secondary' : 'ghost',
              className: cn('navLink', { 'hidden md:flex': link.hideOnMobile }),
              size: 'lg',
            })}
          >
            <LinkIcon className="w-6" />
            <p
              className={`${cn('hidden lg:block', {
                'font-extrabold': isActive,
              })}`}
            >
              {link.name}
            </p>
          </Link>
        )
      })}
    </>
  )
}

export default NavLinks
