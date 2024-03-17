import {NextRequest, NextResponse} from "next/server";

import {getSession} from "@/lib/session";
import {IdResult, ViewCreateBody} from "@/app/api/v1/views/domain/views.entity";
import {viewsRestRepository} from "@/app/api/v1/views/infrastructure/rest/views.repository";
import {viewsUcase} from "@/app/api/v1/views/usecase/views.usecase";

export async function POST(
    req: NextRequest
) {
    try {
        const session = await getSession()
        const {name, path, number} = await req.json();
        const viewsRepository = viewsRestRepository();
        const viewsUseCase = viewsUcase(viewsRepository);
        if (!session) {
            return NextResponse.json("Unauthorized", {status: 404});
        }

        if (!name) {
            return NextResponse.json("Name is required", {status: 400});
        }

        if (!path) {
            return NextResponse.json("Path is required", {status: 400});
        }
        const body: ViewCreateBody = {
            name: name as string,
            number: number as number,
            path: path as string
        }

        const response = await viewsUseCase.createView(body);
        if (!response) {
            return new NextResponse("Server error", {status: 500});
        }
        const result: IdResult = {
            data: response,
            status: 201
        }

        return NextResponse.json(result);
    } catch (error) {
        console.log("GET_VIEWS", error);
        return new NextResponse("Server error", {status: 500});
    }
}

