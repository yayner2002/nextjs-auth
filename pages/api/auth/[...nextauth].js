import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import connectDb from "../../../lib/connectDb.js";
import { verifyPassword } from "../../../lib/auth.js";

export default NextAuth({
  session: {
    // this makes sure how the session for authenticated users is handled
    jwt: true,
  },
  providers: [
    //
    Providers.Credentials({
      // the provider that we are using to authenticate the user with email and password
      async authorize(credentials) {
        // this function is called when the user tries to sign in  with email and password
        const client = await connectDb();
        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        }); // find the user with the email that the user entered
        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        // if the user is found, we need to verify the password
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Invalid password or email!");
        }
        client.close(); // close the connection to the database
        return { email: user.email }; // this object will then actually be encoded into a JSON Web Token (JWT)
      },
    }),
  ],
});
