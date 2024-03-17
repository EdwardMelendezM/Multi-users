import {client} from "@/lib/client";

import {ModulesRepository} from "@/app/api/v1/modules/domain/modules.repository";
import {Module, ModuleCreateBody} from "@/app/api/v1/modules/domain/modules.entity";


export function modulesMysqlRepository(): ModulesRepository {
    return {
        async createModule(moduleId: string, body: ModuleCreateBody): Promise<string | undefined> {
            const query = `INSERT INTO modules (id, name, number, created_at) VALUES (?, ?, ?, ?)`;
            const now = new Date();
            const response = await client(query, [moduleId, body.name, body.number, now]);
            if (response.error) return undefined;
            return moduleId;
        },
        async getModules(): Promise<{ modules: Module[]; status: boolean }> {
            const query = `SELECT * FROM modules`;
            const response = await client(query, []);
            if (response.error) return {modules: [], status: false};
            return {modules: response.rows, status: true};
        },
        async deleteModule(moduleId: string): Promise<boolean> {
            const now = new Date();
            const query = `UPDATE modules SET deleted_at = ? WHERE id = ?`;
            const response = await client(query, [moduleId, now]);
            return !response.error;

        }
    };
}