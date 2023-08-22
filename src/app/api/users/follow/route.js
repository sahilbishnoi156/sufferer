import User from "../../../../models/user";
import { connectToDB } from "../../../../utils/database";

export const PATCH = async (request) => {
  if (request.method !== "PATCH") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { followerId, followingId } = await request.json();
  if (followerId === followingId) {
    return new Response("User Not Found", { status: 404 });
  }
  try {
    await connectToDB();

    // Find the existing follower and following users by their IDs
    const followerUser = await User.findById(followerId); // Which current user is following
    const followingUser = await User.findById(followingId); // Current user using the app

    if (!followerUser || !followingUser) {
      return new Response("User Not Found", { status: 404 });
    }

    // Check if the follower is already following the following user
    if (followerUser.followers.includes(followingId)) {
      // Unfollow: Remove followingId from follower's following list
      followerUser.followers = followerUser.followers.filter(id => id !== followingId);
      // Remove followerId from followingUser's followers list
      followingUser.followings = followingUser.followings.filter(id => id !== followerId);
    } else {
      // Follow: Add followingId to follower's following list
      followerUser.followers.push(followingId);
      // Add followerId to followingUser's followers list
      followingUser.followings.push(followerId);
    }

    // Save both updated users
    await followerUser.save();
    await followingUser.save();

    // Return updated user objects
    return new Response(JSON.stringify({ status: 200, followerUser }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error Updating User:", error);
    return new Response(JSON.stringify({ status: 500, error: "Error Updating User" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
};
