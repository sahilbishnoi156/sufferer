import Post from "../../../../models/post";
import User from "../../../../models/user";
import { connectToDB } from "../../../../utils/database";

export const PATCH = async (request) => {
  if (request.method !== "PATCH") {
    return new Response("Method not allowed", { status: 405 });
  }
  const { userId, postId } = await request.json();

  try {
    await connectToDB();

    // Find the existing follower and following users by their IDs
    const foundUser = await User.findById(userId); // Which current user is following
    const likedPost = await Post.findById(postId); // Current user using the app

    if (!foundUser || !likedPost) {
      return new Response("User Not Found", { status: 404 });
    }

    // Check if the user is already liking the post
    if (likedPost.likes.includes(userId)) {
      // unlike: Remove userId from posts's likes list
      foundUser.likedPosts = foundUser.likedPosts.filter(id => id !== userId)
      likedPost.likes = likedPost.likes.filter(id => id !== userId);
    } else {
      // Like: Add userId to posts's likes list
      foundUser.likedPosts.push(postId);
      likedPost.likes.push(userId);
    }

    // Save both 
    await foundUser.save();
    await likedPost.save();

    // Return updated post
    return new Response(JSON.stringify({ status: 200, likedPost }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error Updating User:", error);
    return new Response(JSON.stringify({ status: 500, error: "Error Updating User" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
};
