import {NextRequest, NextResponse} from "next/server";

import {getSession} from "@/lib/session";
import {client} from "@/lib/client";

export async function PUT(
    req: NextRequest,
    {params}: { params: { viewId: string } }
) {
    try {
        const session = await getSession()

        const {name, path} = await req.json();
        const viewId = params.viewId

        if (!session) {
            return NextResponse.json("Unauthorized", {status: 404});
        }

        if (!viewId) {
            return NextResponse.json("Id is required", {status: 400});
        }

        if (!name) {
            return NextResponse.json("Name is required", {status: 400});
        }

        if (!path) {
            return NextResponse.json("Path is required", {status: 400});
        }

        const query = 'UPDATE views SET name = $, path = $ WHERE id = $'
        const response = await client(query, [name, path, viewId]);

        return NextResponse.json(response);
    } catch (error) {
        console.log("UPDATE_VIEW", error);
        return new NextResponse("Server error", {status: 500});
    }
}

export async function DELETE(
    req: NextRequest,
    {params}: { params: { viewId: string } }
) {
    try {
        const session = await getSession()
        const viewId = params.viewId
        const now = new Date().toISOString();
        if (!session) {
            return NextResponse.json("Unauthorized", {status: 404});
        }
        const query = 'UPDATE views SET deleted_at = ? WHERE id = ?'
        const response = await client(query, [now, viewId]);

        return NextResponse.json({data: response});
    } catch (error) {
        console.log("DELETE_VIEW", error);
        return new NextResponse("Server error", {status: 500});
    }
}
