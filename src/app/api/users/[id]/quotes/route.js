import Quote from "../../../../../models/quotes";
import User from "../../../../../models/user";
import { connectToDB } from "../../../../../utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const quotes = await Quote.find({ creator: params.id }).populate("creator");
    return new Response(JSON.stringify(quotes), { status: 200 });
  } catch (error) {
    return new Response("Failed to get quotes", { status: 500 });
  }
};
