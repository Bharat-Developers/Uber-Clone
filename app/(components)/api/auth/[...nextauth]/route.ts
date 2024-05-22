import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 60, 
    },
    callbacks: {
        async session({ session, token, user }) {
            
            return session;
        },
    },
    events: {
        signOut: async (message) => {
           
            console.log("User signed out", message);
           
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
