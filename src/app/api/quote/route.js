import { connectToDB } from "../../../utils/database";
import Post from "../../../models/post";

const DEFAULT_START_LIMIT = 0;
const DEFAULT_END_LIMIT = 4;

const fetchPosts = async (sLimit, eLimit) => {
  await connectToDB();
  
  const allPosts = await Post.find({}).populate("creator");
  const totalPosts = allPosts.length;
  
  const slicedPosts = allPosts.reverse().slice(sLimit, eLimit);
  return { slicedPosts, totalPosts };
};

export const GET = async (request) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const sLimit = parseInt(searchParams.get("sLimit")) || DEFAULT_START_LIMIT;
  const eLimit = parseInt(searchParams.get("eLimit")) || DEFAULT_END_LIMIT;
  try {
    const { slicedPosts, totalPosts } = await fetchPosts(sLimit, eLimit);
    const responseBody = {
      posts: slicedPosts,
      totalPosts,
    };
    return new Response(JSON.stringify(responseBody), { status: 200 });
  } catch (error) {
    const errorResponse = {
      error: "Failed to get posts",
      errorMessage: error.message,
    };
    return new Response(JSON.stringify(errorResponse), { status: 500 });
  }
};
