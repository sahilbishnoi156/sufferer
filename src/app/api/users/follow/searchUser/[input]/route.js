import User from "../../../../../../models/user";
import { connectToDB } from "../../../../../../utils/database";

export const GET = async (request, { params }) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const searchInput = (searchParams.get("searchInput"));
  const searchType = searchParams.get("searchType");

  try {
    await connectToDB();
    console.log(searchInput, searchType)
    // Get the current user's information
    const currentUser = await User.findById(params.input);
    if (!currentUser) {
      return new Response("Current user not found", { status: 404 });
    }
    
    // Choose whether to search in followers or followings
    const targetArray = searchType === "searchFollower" ? currentUser.followers : currentUser.followings;
    
    // Create a regular expression with 'params.input' to find partial matches
    const searchQuery = { username: { $regex: searchInput, $options: "i" } };
    
    // Find users from the target array based on the search query
    const users = await User.find({ _id: { $in: targetArray }, ...searchQuery });

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch users", { status: 500 });
  }
};
