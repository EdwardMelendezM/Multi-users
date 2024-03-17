import { v4 as uuid } from 'uuid';

import {modulesMysqlRepository} from "@/app/api/v1/modules/infrastructure/mysql/modules.repository";
import {ModulesUseCase} from "@/app/api/v1/modules/domain/modules.usecase";
import {ModuleCreateBody} from "@/app/api/v1/modules/domain/modules.entity";

export function modulesUcase(modulesMysqlRepository: modulesMysqlRepository): ModulesUseCase {
    return {
        async createModule(body: ModuleCreateBody): Promise<string | undefined> {
            const moduleId = uuid();
            return modulesMysqlRepository.createModule(moduleId, body);
        }
    }
}