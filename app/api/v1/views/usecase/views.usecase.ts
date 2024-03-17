import { v4 as uuid } from 'uuid';

import { ViewsUseCase } from "@/app/api/v1/views/domain/views.usecase";
import { View, ViewCreateBody, ViewUpdateBody } from "@/app/api/v1/views/domain/views.entity";
import {viewsRestRepository} from "@/app/api/v1/views/infrastructure/rest/views.repository";

export function viewsUcase(viewsRestRepository: viewsRestRepository): ViewsUseCase {
    return {
        async updateView(id: string, body: ViewUpdateBody): Promise<boolean> {
            return viewsRestRepository.updateView(id, body);
        },

        async createView(data: ViewCreateBody): Promise<string | undefined> {
            const viewId = uuid();
            return viewsRestRepository.createView(viewId, data);
        },

        async getViews(): Promise<{ views: View[], status: boolean }> {
            return viewsRestRepository.getViews();
        },

        async deleteView(id: string): Promise<boolean> {
            return viewsRestRepository.deleteView(id);
        }
    };
}