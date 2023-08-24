import User from "../../../../../models/user";
import { connectToDB } from "../../../../../utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const FoundUser = await User.findById({_id:params.id});
        return new Response(JSON.stringify(FoundUser), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch User", { status: 500 });
    }
};
