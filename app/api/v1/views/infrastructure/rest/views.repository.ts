import {client} from "@/lib/client";

import {
    View,
    ViewCreateBody,
    ViewUpdateBody
} from "@/app/api/v1/views/domain/views.entity";
import {ViewsRepository} from "@/app/api/v1/views/domain/views.repository";

export function viewsRestRepository(): ViewsRepository {
    return {
        async updateView(id: string, data: ViewUpdateBody): Promise<boolean> {
            const {name, number} = data;
            const query = "UPDATE views SET name = ?, number = ? WHERE id = ?;"
            const response = await client(query, [name, number, id]);

            return !response.error;
        },

        async createView(viewId: string, data: ViewCreateBody): Promise<string | undefined> {
            const {name, number, path} = data;
            const query = "INSERT INTO views (id, name, number, path) VALUES (?, ?, ?, ?);"

            const response = await client(query, [viewId, name, number, path]);
            if (response.error) return undefined;
            return viewId;
        },

        async getViews(): Promise<{ views: View[], status: boolean }> {
            const query = "SELECT * FROM views;"
            const response = await client(query, []);
            if (response.error) return {views: [], status: false};

            return {views: response.rows, status: true};
        },

        async deleteView(id: string): Promise<boolean> {
            const query = "DELETE FROM views WHERE id = ?;"
            const response = await client(query, [id]);

            return !response.error;
        }
    };
}