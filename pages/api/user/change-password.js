import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../lib/auth.js";
import connectDb  from "../../../lib/connectDb.js";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const userEmail = session.user.email;
  const { newPassword, oldPassword } = req.body;
  // check is user exists in db

  const client = await connectDb();
  const userCollection = client.db().collection("users");

  const user = await userCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    client.close();
    return;
  }

  // check if old password is correct with the one in db

  const currentPassword = user.password;

  const areEquall = await verifyPassword(oldPassword, currentPassword);

  if (!areEquall) {
    res.status(403).json({ message: "Invalid password" });
    client.close();
    return;
  }

  // update password in db

  const hashedPassword = await hashPassword(newPassword);

  const result = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: "Password updated" });
}

export default handler;
