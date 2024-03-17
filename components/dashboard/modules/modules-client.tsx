"use client";

import {Plus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";

import {Button} from "@/components/ui/button";
import {Heading} from "@/components/ui/heading";
import {Separator} from "@/components/ui/separator";
import {columnsModule, ModuleColumn} from "@/components/dashboard/modules/modules-columns";
import {DataTable} from "@/components/dashboard/views/data-table";

interface ModulesClientProps {
    data: ModuleColumn[];
};

export const ModuleClient: React.FC<ModulesClientProps> = ({
                                                               data
                                                           }) => {
    const params = useParams();
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Modulos (${data.length})`}
                         description="Gestiona tus modulos"/>
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="mr-2 h-4 w-4"/> Agregar nuevo
                </Button>
            </div>
            <Separator/>
            <DataTable searchKey="name" placeholder={"por nombre"} columns={columnsModule} data={data}/>
        </>
    );
};
