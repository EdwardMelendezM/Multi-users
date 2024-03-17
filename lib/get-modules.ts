import {redirect} from "next/navigation";
import {getSession} from "./session";
import {client} from "./client";

export type Module = {
    id: string;
    name: string;
    number: string;
    created_at: string;
}

export const getModules = async () => {
    const session = await getSession()

    if (!session) {
        return redirect('/')
    }

    const query = 'SELECT id, name, number, created_at FROM modules WHERE deleted_at IS NULL ORDER BY number;'
    const response = await client(query, []);

    console.log(response)
    if (response.error) {
        return [] as Module[]
    }

    return response.rows as Module[]
}