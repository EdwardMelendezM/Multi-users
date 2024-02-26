import { redirect } from "next/navigation";
import { getSession } from "./session";
import { client } from "./client";

export type Module = {
  id: string;
  name: string;
  created_at: string;
}

export const getModules = async (email: string) => {
  const session = await getSession()

  if (!session) {
    return redirect('/')
  }

  const query = 'SELECT id, name, created_at FROM modules WHERE deleted_at IS NULL'
  const response = await client(query, []);

  return response as Module[]
}