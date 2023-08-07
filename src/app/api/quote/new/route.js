import Quote from '../../../../models/quotes'
import { connectToDB } from "../../../../utils/database";

export const POST = async (request) => {
    const { userId, quote, title } = await request.json();

    try {
        await connectToDB();
        const newQuote = new Quote({ creator: userId, quote, title });
        await newQuote.save();
        return new Response(JSON.stringify(newQuote), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new quote", { status: 500 });
    }
} 