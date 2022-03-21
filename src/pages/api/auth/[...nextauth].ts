import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "src/apollo/apollo-client";
import { SIGN_IN, SIGN_UP } from "src/graphql/mutations/auth";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1 * 1 * 60 * 60,
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      async authorize(credentials) {
        // let user: Partial<IUserData> = {};

        if (credentials?.firstName) {
          const { data, errors } = await client.mutate({
            mutation: SIGN_UP,
            variables: {
              emailAddress: credentials?.emailAddress,
              firstName: credentials?.firstName,
              lastName: credentials?.lastName,
              password: credentials?.password,
            },
          });
          if (data.signUp.token) {
            console.log(data);
            return data.signUp.token;
          }
          console.log(errors);
          return null;
        }
        const { data } = await client.mutate({
          mutation: SIGN_IN,
          variables: {
            emailAddress: credentials?.emailAddress,
            password: credentials?.password,
          },
        });

        if (data.authenticate.token) {
          return data.authenticate.token;
        }
        return null;
      },
      credentials: {
        emailAddress: {
          label: "email",
          type: "email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          label: "password",
          type: "password",
        },
        firstName: {
          label: "firstname",
          type: "text",
        },
        lastName: {
          label: "lastname",
          type: "text",
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  callbacks: {
    //   async createUser(emailAddress, firstname, lastname, password){

    //   },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as any;
      }
      if (token) {
        session.accessToken = token.accessToken;
      }
      console.log(session);
      return session;
    },
    async jwt({ token, account, user }) {
      console.log(user);
      if (user) {
        token.user = user;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
});
