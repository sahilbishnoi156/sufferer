import User from "../../../../../models/user";
import { connectToDB } from "../../../../../utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const FoundUser = await User.find({email:params.id});
        if (FoundUser[0].username) {
            return new Response(JSON.stringify({foundUsername:true}), { status: 200 });
        }
        else{
            return new Response(JSON.stringify({foundUsername:false}), { status: 200 });
        }
    } catch (error) {
        return new Response("Failed to fetch User", { status: 500 });
    }
};
