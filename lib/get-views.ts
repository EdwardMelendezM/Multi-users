import {redirect} from "next/navigation";
import {getSession} from "./session";
import {client} from "./client";

export type View = {
    id: string;
    name: string;
    path: string;
    created_at: string;
}

export const getViews = async (email: string) => {
    const session = await getSession()

    if (!session) {
        return redirect('/')
    }

    const query = 'SELECT id, name, path, created_at FROM views WHERE deleted_at IS NULL ORDER BY number;'
    const response = await client(query, []);

    if (response.error) {
        return []
    }

    return response.rows  as View[]
}