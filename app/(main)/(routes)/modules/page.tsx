import {Metadata} from "next";
import { es } from 'date-fns/locale';
import {getModules} from "@/lib/get-modules";
import {format} from "date-fns";

import {ModuleClient} from "@/components/dashboard/modules/modules-client";

export const metadata: Metadata = {
    title: "Modulos",
    description: "Mantenimiento de modulos",
}

export default async function ModulesPage() {
    const modules = await getModules();
    const formattedModules = modules.map((item) => ({
        id: item.id,
        name: item.name,
        number: item.number,
        created_at: format(item.created_at, "dd/mm/yy", { locale: es }),
    }));
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ModuleClient data={formattedModules}/>
            </div>
        </div>
    );
} 