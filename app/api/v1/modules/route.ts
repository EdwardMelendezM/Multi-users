import {NextRequest, NextResponse} from "next/server";

export async function POST(
    req: NextRequest
) {
    try {
        const {name, number} = await req.json();
        if (!name) {
            return NextResponse.json("Name is required", {status: 400});
        }
        if (!number) {
            return NextResponse.json("Number is required", {status: 400});
        }
        const body = {
            name: name as string,
            number: number as number,
        }
        return NextResponse.json(body);
    } catch (error) {
        console.log("POST", error);
        return new NextResponse("Server error", {status: 500});
    }
}