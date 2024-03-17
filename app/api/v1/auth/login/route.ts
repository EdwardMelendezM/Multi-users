import {client} from "@/lib/client";
import {getSession, loginSession} from "@/lib/session";
import {NextRequest, NextResponse} from "next/server";

type User = {
    id: string;
}

export async function POST(
    req: NextRequest,
) {
    try {

        const {email, password} = await req.json();

        if (!email) {
            return NextResponse.json("Email are required", {status: 400});
        }

        const query = 'SELECT * FROM users WHERE email = ? AND password = ?'

        const response = await client(query, [email, password]);

        //@ts-ignore
        if (response.error) {
            return NextResponse.json({
                message: "User not found",
                code: "USER_NOT_FOUND"
            }, {status: 404});
        }

        //@ts-ignore
        const userId = response[0].id as string;

        const user: User = {id: userId};
        await loginSession(user);

        return NextResponse.json({data: "success"});

    } catch (error) {
        console.log("POST_LOGIN", error);
        return new NextResponse("Error", {status: 500});
    }
}