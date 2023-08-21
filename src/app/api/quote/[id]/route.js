import Post from "../../../../models/post";
import { connectToDB } from "../../../../utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const FoundPost = await Post.findById(params.id).populate("creator")
        if (!FoundPost) return new Response("Post Not Found", { status: 404 });

        return new Response(JSON.stringify(FoundPost), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { caption, image } = await request.json();

    try {
        await connectToDB();
        // Find the existing prompt by ID
        const existingPost = await Post.findById(params.id);
        if (!existingPost) {
            return new Response("Post not found", { status: 404 });
        }
        // Update the prompt with new data
        existingPost.caption = caption;
        existingPost.image = image;

        await existingPost.save();

        return new Response("Successfully updated the Post", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Post", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Post.findByIdAndRemove(params.id);

        return new Response("Post deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting Post", { status: 500 });
    }
};