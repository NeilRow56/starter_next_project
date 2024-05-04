'use client'

import * as React from 'react'

import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Currencies, Currency } from '@/lib/currencies'
import { useMutation, useQuery } from '@tanstack/react-query'
import { UserSettings } from '@prisma/client'
import SkeletonWrapper from './SkeletonWrapper'
import { toast } from 'sonner'
import { UpdateUserCurrency } from '@/app/wizard/_actions/userSettings'

export function CurrencyComboBox() {
  return <div>Combo box</div>
}
