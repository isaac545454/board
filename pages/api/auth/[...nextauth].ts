import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user",
    }),
  ],
  callback: {
    async session(session, token) {
      try {
        const data = {
          id: "1aaa",
          ...session,
        };
        return data;
        console.log(data.id);
      } catch {
        return {
          id: "aaa",
          ...session,
        };
      }
    },
    async signIn(user, account, profile) {
      const { email } = user;

      try {
        return true;
      } catch {
        return false;
      }
    },
  },
};
export default NextAuth(authOptions);
