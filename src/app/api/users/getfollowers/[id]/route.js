import User from "../../../../../models/user";
import { connectToDB } from "../../../../../utils/database";

export const GET = async (request, { params }) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const tabType = searchParams.get("tabType");

  try {
    await connectToDB();
    const foundUser = await User.findById(params.id);

    if (!foundUser) {
      return new Response("User not found", { status: 404 });
    }

    let userResults;

    if (tabType === "followers") {
      userResults = await fetchFollowersOrFollowings(foundUser.followers);
    } else if (tabType === "followings") {
      userResults = await fetchFollowersOrFollowings(foundUser.followings);
    } else {
      return new Response("Invalid tabType", { status: 400 });
    }

    return new Response(JSON.stringify(userResults), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to retrieve data", { status: 500 });
  }
};

async function fetchFollowersOrFollowings(ids) {
  const userResults = await Promise.all(
    ids.map(async (id) => {
      const user = await User.findById(id);
      return user;
    })
  );
  return userResults;
}
