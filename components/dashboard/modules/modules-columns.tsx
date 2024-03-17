"use client"

import {ColumnDef} from "@tanstack/react-table"

import {CellActionModule} from "./modules-cell-action"

export type ModuleColumn = {
    id: string;
    name: string;
    number: string;
    created_at: string;
}

type BadgeVariant = "destructive" | "outline";

export const columnsModule: ColumnDef<ModuleColumn>[] = [
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "number",
        header: "Orden",
    },
    {
        accessorKey: "created_at",
        header: "F. Creacion",
    },
    {
        id: "actions",
        cell: ({row}) => <CellActionModule data={row.original}/>
    },
];
