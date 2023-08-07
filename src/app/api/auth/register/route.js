import User from "../../../../models/user";
import { connectToDB } from "../../../../utils/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET; // Replace with your actual JWT secret

export const POST = async (request) => {
  const { email, username, password, first_name, last_name, image } =
    await request.json();
  try {
    await connectToDB();
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return new Response(JSON.stringify({ userCreated: false }), {
        status: 200,
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const secretPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        given_name: first_name,
        family_name: last_name,
        username: username,
        email: email,
        password: secretPassword,
        image: image,
      });
      const data = {
        user: {
          id: newUser.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      await newUser.save();
      return new Response(
        JSON.stringify({
          newUser: newUser,
          authToken: authToken,
          userCreated: true,
        }),
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error)
    return new Response("Failed to create a new User", { status: 500 });
  }
};
