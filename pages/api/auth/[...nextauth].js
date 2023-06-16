import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import Google from "next-auth/providers/google"
import KeycloakProvider from 'next-auth/providers/keycloak'
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: "755953158057-52kt5q9g6jnfbvr7cn67sjejdg75jqvc.apps.googleusercontent.com",
      clientSecret: "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",
      
    }),
  
    // ...add more providers here
  ],
  pages:{
    siginin: "/signin"
  },
  secret:process.env.SECRET,
  callbacks:{
    async session({session , token }){
      session.user.id = token.sub;
      
      return session;
    }
  }
})