import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcryptjs from 'bcryptjs'
import db from './db'

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/auth/sign-in',
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'User Name',
          type: 'text',
          placeholder: 'Your User Name',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      // Below we are using the user's email as their username
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: {
            email: credentials?.username,
          },
        })

        if (!user) throw new Error('User name or password is not correct')

        if (!credentials?.password)
          throw new Error('Please Provide Your Password')
        const isPassowrdCorrect = await bcryptjs.compare(
          credentials.password,
          user.password
        )

        if (!isPassowrdCorrect)
          throw new Error('User name or password is not correct')

        const { password, ...userWithoutPass } = user
        return userWithoutPass
      },
    }),
  ],
}
