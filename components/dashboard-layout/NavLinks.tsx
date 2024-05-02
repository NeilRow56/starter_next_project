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
  { name: 'Dashboard', href: '/dashboard', icon: BookDashed },
  {
    name: 'Search',
    href: '/search',
    icon: Search,
    hideOnMobile: true,
  },
  { name: 'Services', href: '/services', icon: Compass },
  {
    name: 'Reels',
    href: '/reels',
    icon: Clapperboard,
    hideOnMobile: true,
  },
  {
    name: 'Messages',
    href: '/messages',
    icon: MessageCircle,
  },
  {
    name: 'Notifications',
    href: '/notifications',
    icon: Heart,
    hideOnMobile: true,
  },
  {
    name: 'Create',
    href: '/create',
    icon: PlusSquare,
  },
  {
    name: 'Settings',
    href: '/settings',
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
