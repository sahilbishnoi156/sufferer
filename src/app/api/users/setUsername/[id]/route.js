import User from "../../../../../models/user";
import { connectToDB } from "../../../../../utils/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET; // Replace with your actual JWT secret

export const PATCH = async (request, { params }) => {
  const { username, password } = await request.json();
  try {
    await connectToDB();
    // Find the existing prompt by ID
    const existingUser = await User.findById(params.id);

    if (!existingUser) {
      return new Response("Invalid Credentials", { status: 404 });
    }

    const salt = await bcrypt.genSalt(10);
    const secretPassword = await bcrypt.hash(password, salt);

    // Update the prompt with new data
    existingUser.username = username;
    existingUser.password = secretPassword;

    const data = {
      user: {
        id: params.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);

    await existingUser.save();
    return new Response(JSON.stringify({ authToken }), { status: 200 });
  } catch (error) {
    return new Response("Error Updating User", { status: 500 });
  }
};
