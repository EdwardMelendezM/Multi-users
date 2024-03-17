import {Module, ModuleCreateBody} from "@/app/api/v1/modules/domain/modules.entity";
import {IdResult} from "@/app/api/v1/views/domain/views.entity";

export interface ModulesUseCase {
    createModule(data: ModuleCreateBody): Promise<string | undefined>;

    getModules(): Promise<{ modules: Module[], status: boolean }>;

    deleteModule(moduleId: string): Promise<boolean>;
}