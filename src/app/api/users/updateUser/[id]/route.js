import User from "../../../../../models/user";
import { connectToDB } from "../../../../../utils/database";

export const PATCH = async (request, { params }) => {
    const { username, given_name, family_name, email, image, about  } = await request.json();

    try {
        await connectToDB();
        // Find the existing prompt by ID
        const existingUser = await User.findById(params.id);
        if (!existingUser) {
            return new Response("User not found", { status: 404 });
        }
        // Update the prompt with new data
        existingUser.username = username;
        existingUser.given_name = given_name;
        existingUser.family_name = family_name;
        existingUser.email = email;
        existingUser.image = image;
        existingUser.about = about;

        await existingUser.save();

        return new Response("Successfully updated the User", { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response("Error Updating User", { status: 500 });
    }
};