import {View, ViewCreateBody, ViewUpdateBody} from "@/app/api/v1/views/domain/views.entity";

export interface ViewsUseCase {
    createView(data: ViewCreateBody): Promise<string | undefined>;

    updateView(id: string, data: ViewUpdateBody): Promise<boolean>;

    deleteView(id: string): Promise<boolean>;

    getViews(): Promise<{ views: View[], status: boolean }>;
}