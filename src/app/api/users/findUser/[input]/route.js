import User from "../../../../../models/user";
import { connectToDB } from "../../../../../utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        
        // Create a regular expression with 'params.input' to find partial matches
        const searchQuery = { username: { $regex: params.input, $options: "i" } };
        
        // Perform the search using the 'User' model with the regular expression query
        const users = await User.find(searchQuery);
        
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch users", { status: 500 });
    }
};
