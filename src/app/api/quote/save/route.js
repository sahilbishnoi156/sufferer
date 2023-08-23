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
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return new Response("User Not Found", { status: 404 });
    }

    // Check if the user is already liking the post
    if (foundUser.savedPosts.includes(postId)) {
      // Unlike: Remove userId from post's likes list
      foundUser.savedPosts = foundUser.savedPosts.filter(id => id !== postId);
    } else {
      // Like: Add userId to post's likes list
      foundUser.savedPosts.push(postId);
    }

    // Save both
    await foundUser.save();
    // Return updated post
    return new Response(JSON.stringify({ status: 200 , foundUser}), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error Updating User:", error);
    return new Response(JSON.stringify({ status: 500, error: "Error Updating User" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
};
