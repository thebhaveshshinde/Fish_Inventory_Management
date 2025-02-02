import GoogleProvider from 'next-auth/providers/google';
import { NuxtAuthHandler } from '#auth';

export default NuxtAuthHandler({
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session({ session }) {
      return session;
    },
    signIn() {
      return true
    },
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLEINT_SECRET,
    }),
  ],
  theme: {
    colorScheme: 'auto',
  },

  
});