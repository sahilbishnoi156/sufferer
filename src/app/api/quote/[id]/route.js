import Quote from "../../../../models/quotes";
import { connectToDB } from "../../../../utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const quote = await Quote.findById(params.id).populate("creator")
        if (!quote) return new Response("Quote Not Found", { status: 404 });

        return new Response(JSON.stringify(quote), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { quote, title } = await request.json();

    try {
        await connectToDB();
        // Find the existing prompt by ID
        const existingQuote = await Quote.findById(params.id);
        if (!existingQuote) {
            return new Response("Quote not found", { status: 404 });
        }
        // Update the prompt with new data
        existingQuote.quote = quote;
        existingQuote.title = title;

        await existingQuote.save();

        return new Response("Successfully updated the Quote", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Quote", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Quote.findByIdAndRemove(params.id);

        return new Response("Quote deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting quote", { status: 500 });
    }
};