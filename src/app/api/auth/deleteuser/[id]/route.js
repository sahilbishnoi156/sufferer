import Post from "../../../../../models/post";
import User from "../../../../../models/user";
import { connectToDB } from "../../../../../utils/database";

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        const user = await User.findById(params.id);

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        // Find all posts associated with the user and remove them
        await Post.deleteMany({ creator: params.id });

        // Remove the user itself
        await User.findByIdAndRemove(params.id);

        return new Response("User and associated posts deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting user and posts", { status: 500 });
    }
};
