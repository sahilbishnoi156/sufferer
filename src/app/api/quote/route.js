import Quote from "../../../models/quotes";
import { connectToDB } from "../../../utils/database";

export const GET = async (request) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const sLimit = searchParams.get("sLimit") || 0;
  const eLimit = searchParams.get("eLimit") || 4;
  try {
    await connectToDB();
    const quotes = await Quote.find({}).populate("creator");
    const totalQuotes = quotes.length;
    return new Response(JSON.stringify({quotes:quotes.slice(sLimit, eLimit), totalQuotes}), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get quotes", errorMessage: error.message }), { status: 500 });

  }
};
