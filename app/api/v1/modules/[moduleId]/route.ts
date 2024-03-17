import {NextRequest, NextResponse} from "next/server";

import {getSession} from "@/lib/session";
import {client} from "@/lib/client";

import {modulesMysqlRepository} from "@/app/api/v1/modules/infrastructure/mysql/modules.repository";
import {modulesUcase} from "@/app/api/v1/modules/usecase/modules.usecase";

const modulesRepository = modulesMysqlRepository();
const modulesUseCase = modulesUcase(modulesRepository);

export async function DELETE(
    req: NextRequest,
    {params}: { params: { moduleId: string } }
) {
    try {
        const session = await getSession()
        const moduleId = params.moduleId
        const now = new Date();
        if (!session) {
            return NextResponse.json("Unauthorized", {status: 404});
        }
        const query = 'UPDATE modules SET deleted_at = ? WHERE id = ?'
        const response = await client(query, [now, moduleId]);

        return NextResponse.json({data: response});
    } catch (error) {
        console.log("DELETE_MODULE", error);
        return new NextResponse("Server error", {status: 500});
    }
}