import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import firebase from "../../../services/firebaseConnect";

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
    async session({ session, profile }) {
      try {
        const snapshot = await firebase
          .firestore()
          .collection("users")
          .doc(token.sub)
          .get();

        const lastDonate = snapshot.exists
          ? snapshot.data()?.lastDonate.toDate()
          : null;

        return {
          ...session,
          id: token.sub,
          vip: lastDonate ? true : false,
          lastDonate,
        };
      } catch {
        return {
          ...session,
          vip: false,
          lastDonate: null,
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
