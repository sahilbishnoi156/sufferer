import Post from '../../../../models/post'
import { connectToDB } from "../../../../utils/database";

export const POST = async (request) => {
    const { userId, caption, title, image } = await request.json();

    try {
        await connectToDB();
        const newPost = new Post({ creator: userId, caption, title, image });
        await newPost.save();
        return new Response(JSON.stringify(newPost), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new quote", { status: 500 });
    }
} 