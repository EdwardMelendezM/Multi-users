import {client} from "@/lib/client";
import {ModulesRepository} from "@/app/api/v1/modules/domain/modules.repository";
import {ModuleCreateBody} from "@/app/api/v1/modules/domain/modules.entity";


export function modulesMysqlRepository(): ModulesRepository {
    return {
        async createModule(moduleId: string, body: ModuleCreateBody): Promise<string | undefined> {
            const query = `INSERT INTO modules (id, name, number, created_at) VALUES (?, ?, ?, ?, ?)`;
            const now = new Date.now();
            const response = await client(query, [moduleId, body.name, body.number, now]);
            if (response.error) return undefined;
            return moduleId;
        }
    };
}