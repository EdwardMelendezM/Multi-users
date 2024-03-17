import {Module, ModuleCreateBody} from "@/app/api/v1/modules/domain/modules.entity";

export interface ModulesRepository {
    createModule(moduleId: string, body: ModuleCreateBody): Promise<string | undefined>;

    getModules(): Promise<{ modules: Module[], status: boolean }>;

    deleteModule(moduleId: string): Promise<boolean>;
}