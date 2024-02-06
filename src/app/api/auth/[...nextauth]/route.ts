import NextAuth, {NextAuthOptions, Session, User} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_SECRET_KEY as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],

    secret: process.env.NEXTAUTH_SECRET as string,
    jwt: {
        maxAge: 60 * 60 * 24,
    },

    callbacks: {
        async jwt({token}) {
            return token;
        },
        async session({session}: { session: Session }) {

            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
