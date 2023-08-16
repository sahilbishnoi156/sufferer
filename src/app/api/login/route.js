import User from "../../../models/user";
import { connectToDB } from "../../../utils/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET; // Replace with your actual JWT secret

export const POST = async (request) => {
  const { email, password } = await request.json();
  try {
    await connectToDB();
    const userExists = await User.findOne({email:email});
    if (!userExists) {
      return new Response(JSON.stringify({ userFound:false }), { status: 200 });
    }
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ isMatch:false,userFound:true }), { status: 200 });
    }
    const authToken = jwt.sign({ _id: userExists._id }, JWT_SECRET);
    return new Response(JSON.stringify({ authToken,userFound:true, isMatch:true, userId:userExists._id }), { status: 200 });

  } catch (error) {
    console.log(error)
    return new Response("Error Updating User", { status: 500 });
  }
};
