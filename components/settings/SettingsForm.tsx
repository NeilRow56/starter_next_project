'use client'

import { SettingsSchema } from '@/schemas/settings'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CardWrapper } from '../auth/CardWrapper'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2, MailIcon, Save } from 'lucide-react'
import { User } from '@prisma/client'
import { updateUser } from '@/actions/settings'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

export const SettingsForm = ({ user }: { user: User }) => {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      id: user.id,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      colorScheme: user.colorScheme || '',
    },
  })

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      updateUser(values)
        .then((data) => {
          if (data?.error) {
            form.reset()
            toast.error(data.error)
          }

          if (data?.success) {
            form.reset()
            toast.success(data.success)
          }
        })
        .catch(() => toast.error('Something went wrong'))
    })
  }

  return (
    <CardWrapper
      headerLabel="Enter details to update your account"
      backButtonLabel=""
      backButtonHref="/dashboard/settings"
    >
      <Form {...form}>
        <form
          className="gap-3 space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className=" grid gap-3  sm:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="firstName" className="flex w-full">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="firstName"
                      name="firstName"
                      placeholder="John "
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="lastName" className="flex w-full">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email" className="flex w-full">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.doe@example.com"
                      disabled={isPending}
                      type="email"
                      id="email"
                      name="email"
                      suffix={<MailIcon />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorScheme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select A Colour Theme</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Colour" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="theme-green">Green</SelectItem>
                      <SelectItem value="theme-blue">Blue</SelectItem>
                      <SelectItem value="theme-violet">Violet</SelectItem>
                      <SelectItem value="theme-yellow">Yellow</SelectItem>
                      <SelectItem value="theme-orange">Orange</SelectItem>
                      <SelectItem value="theme-red">Red</SelectItem>
                      <SelectItem value="theme-rose">Rose</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="max-w-[150px]">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4" /> Processing
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save
              </>
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
