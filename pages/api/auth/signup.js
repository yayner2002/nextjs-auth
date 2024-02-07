import { hashPassword } from "../../../lib/auth";
import connectDb from "../../../lib/connectDb";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const { email, password } = req.body;

  // check for data validity
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
    return;
  }

  const client = await connectDb();
  const db = client.db();

  // check if email already exists

  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    client.close();
    return;
  }
  const hashedPassword = await hashPassword(password);
  const result = await db.collection("users").insertOne({
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Created user!" });
  client.close();
};

export default handler;
