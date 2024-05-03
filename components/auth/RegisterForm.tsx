'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useTransition } from 'react'
import { toast } from 'react-toastify'
// import { passwordStrength } from 'check-password-strength'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { CardWrapper } from './CardWrapper'

import { Loader2, LogIn, MailIcon } from 'lucide-react'
import { PasswordInput } from './PasswordInput'

import { Button } from '@/components/ui/button'
import { register } from '@/actions/auth-actions/register'
import { useRouter } from 'next/navigation'
import { RegisterSchema } from '@/schemas/auth'

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(values)
        .then((data) => {
          if (data?.error) {
            form.reset()
            toast.error(data.error)
          }

          if (data?.success) {
            form.reset()
            router.push('/auth/sign-in')
            toast.success(data.success)
          }
        })
        .catch(() => toast.error('Something went wrong'))
    })
  }

  return (
    <CardWrapper
      headerLabel="Enter details to create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/sign-in"
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
                  <FormLabel className="flex w-full">First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
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
                  <FormLabel className="flex w-full">Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Doe" disabled={isPending} />
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
                  <FormLabel className="flex w-full">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.doe@example.com"
                      disabled={isPending}
                      type="email"
                      suffix={<MailIcon />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex w-full">Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      placeholder="******"
                      disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex w-full">
                    {' '}
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="max-w-[150px]" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4" /> Processing
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" /> Register
              </>
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
