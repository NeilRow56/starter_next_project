'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { buttonVariants } from '../ui/button'

interface NavbarItemProps {
  label: string
  href: string
  clickCallback?: () => void
}

export default function NavbarItem({
  label,
  href,
  clickCallback,
}: NavbarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  return (
    <div className="relative flex items-center ">
      <Link
        href={href}
        className={cn(
          buttonVariants({
            variant: 'ghost',
          }),
          'w-full justify-start text-lg text-muted-foreground hover:text-primary/70',
          isActive && 'font-bold text-primary'
        )}
        onClick={() => {
          if (clickCallback) clickCallback()
        }}
      >
        {label}
      </Link>
      {isActive && (
        <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-primary  md:block" />
      )}
    </div>
  )
}
