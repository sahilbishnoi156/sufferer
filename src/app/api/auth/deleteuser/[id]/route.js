import Quote from "../../../../../models/quotes";
import User from "../../../../../models/user";
import { connectToDB } from "../../../../../utils/database";

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        const user = await User.findById(params.id);

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        // Find all quotes associated with the user and remove them
        await Quote.deleteMany({ creator: params.id });

        // Remove the user itself
        await User.findByIdAndRemove(params.id);

        return new Response("User and associated quotes deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting user and quotes", { status: 500 });
    }
};
