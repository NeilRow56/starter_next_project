'use client'

import { useState } from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import Logo, { LogoMobile } from './Logo'
import NavbarItem from './NavbarItem'
import { ThemeToggle } from './ThemeToggle'
import { UserNav } from './UserNav'
import UserButton from './UserButton'

export default function MobileNavbar() {
  const items = [
    { label: 'Transactions', href: '/transactions' },
    { label: 'Manage', href: '/manage' },
  ]

  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="block border-separate bg-background lg:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]" side="left">
            <Logo />
            <div className="flex flex-col gap-1 pt-4">
              {items.map((item) => (
                <NavbarItem
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  clickCallback={() => setIsOpen((prev) => !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <LogoMobile />
        </div>
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <UserButton />
        </div>
      </nav>
    </div>
  )
}
