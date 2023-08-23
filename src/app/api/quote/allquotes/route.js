import Post from "../../../../models/post";
import { connectToDB } from "../../../../utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    const allPosts = await Post.find({}).populate("creator");
    const totalPosts = allPosts.length;
    return new Response(JSON.stringify({posts:allPosts, totalPosts}), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get posts", errorMessage: error.message }), { status: 500 });

  }
};
