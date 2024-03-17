import {NextRequest, NextResponse} from "next/server";

import {modulesMysqlRepository} from "@/app/api/v1/modules/infrastructure/mysql/modules.repository";
import {modulesUcase} from "@/app/api/v1/modules/usecase/modules.usecase";
import {IdResult, moduleResult} from "@/app/api/v1/modules/domain/modules.entity";

const modulesRepository = modulesMysqlRepository();
const modulesUseCase = modulesUcase(modulesRepository);

export async function GET(
    req: NextRequest
) {
    try {
        const {modules, status} = await modulesUseCase.getModules();
        if (!status) {
            return NextResponse.json("Server error", {status: 500});
        }
        const result: moduleResult = {
            data: modules,
            status: 200
        }
        return NextResponse.json(result, {status: 200});
    } catch (error) {
        console.log("MODULES_GET", error);
        return new NextResponse("Server error", {status: 500});
    }
}

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
        const response = await modulesUseCase.createModule(body);
        if (!response) {
            return NextResponse.json("Server error", {status: 500});
        }
        const result: IdResult = {
            data: response,
            status: 201
        }
        return NextResponse.json(result, {status: 201});
    } catch (error) {
        console.log("MODULES_POST", error);
        return new NextResponse("Server error", {status: 500});
    }
}