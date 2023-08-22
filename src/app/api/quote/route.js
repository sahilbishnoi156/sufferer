import Post from "../../../models/post";
import { connectToDB } from "../../../utils/database";

export const GET = async (request) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const sLimit = searchParams.get("sLimit") || 0;
  const eLimit = searchParams.get("eLimit") || 4;
  try {
    await connectToDB();
    const allPosts = await Post.find({}).populate("creator");
    const totalPosts = allPosts.length;
    return new Response(JSON.stringify({posts:allPosts.reverse().slice(sLimit, eLimit), totalPosts}), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get posts", errorMessage: error.message }), { status: 500 });

  }
};
