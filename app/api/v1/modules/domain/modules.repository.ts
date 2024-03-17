import {IdResult, ModuleCreateBody} from "@/app/api/v1/modules/domain/modules.entity";

export interface ModulesRepository {
    createModule(moduleId: string, body: ModuleCreateBody): Promise<string | undefined>;
}