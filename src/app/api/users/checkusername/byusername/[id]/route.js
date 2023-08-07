import User from "../../../../../../models/user";
import { connectToDB } from "../../../../../../utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const foundUser = await User.findOne({ username: params.id });
    if (foundUser) {
      return new Response(JSON.stringify({ foundUsername: true }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ foundUsername: false }), {
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch User", { status: 500 });
  }
};
