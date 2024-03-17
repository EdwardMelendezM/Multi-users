
"use client";

import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Module} from "@/lib/get-modules";

import {useToast} from "@/components/ui/use-toast";

interface CellActionModuleProps {
    data: Module;
}

export const CellActionModule: React.FC<CellActionModuleProps> = ({
                                                          data,
                                                      }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast()

    const onConfirm = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/v1/views/${data.id}`);
            toast({
                title: "Exito!",
                description: "Eliminado correctamente.",
            })
            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Consulte con el administrador.",
                variant: "destructive"
            })
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast({
            title: "Exito!",
            description: "Copiado correctamente.",
        })
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => onCopy(data.id)}
                    >
                        <Copy className="mr-2 h-4 w-4" /> Copiar Id
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => router.push(`/${params.storeId}/products/${data.id}`)}
                    >
                        <Edit className="mr-2 h-4 w-4" /> Actualizar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="mr-2 h-4 w-4" /> Eliminar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
