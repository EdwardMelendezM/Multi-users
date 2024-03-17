import {View, ViewCreateBody, ViewUpdateBody} from "@/app/api/v1/views/domain/views.entity";

export interface ViewsRepository {
    createView(viewId: string, data: ViewCreateBody): Promise<string | undefined>;

    updateView(viewId: string, data: ViewUpdateBody): Promise<boolean>;

    deleteView(viewId: string): Promise<boolean>;

    getViews(): Promise<{ views: View[], status: boolean }>;
}