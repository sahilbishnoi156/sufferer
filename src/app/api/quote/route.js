import { connectToDB } from "../../../utils/database";
import Post from "../../../models/post";

const DEFAULT_START_LIMIT = 0;

const fetchPosts = async (_start, _limit) => {
  await connectToDB();
  
  const allPosts = await Post.find({}).populate("creator");
  const totalPosts = allPosts.length;
  const slicedPosts = allPosts.reverse().slice(_start, _start + _limit);
  return { slicedPosts, totalPosts };
};

export const GET = async (request) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const _start = parseInt(searchParams.get("_start")) || DEFAULT_START_LIMIT;
  const _limit = parseInt(searchParams.get("_limit")) || 4;
  try {
    const { slicedPosts, totalPosts } = await fetchPosts(_start, _limit);
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
