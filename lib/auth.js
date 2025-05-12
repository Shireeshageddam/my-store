// lib/auth.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"; // Example provider, replace with what you're using

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add other providers like GitHub, Email, etc.
  ],
  session: {
    strategy: "jwt", // Use JWT tokens for session management
  },
   callbacks: {
    async jwt({ token, user }) {
      // On first sign in, add user info to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role || "user"; // Default role is 'user' if no role is provided
      }
      return token;
    },
    async session({ session, token }) {
      // Attach token data (user info, role) to the session
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/admin/login", // Redirect users to the login page if not authenticated
  },
  debug: process.env.NODE_ENV === "development", // Enable debugging during development
};

export default NextAuth(authOptions);