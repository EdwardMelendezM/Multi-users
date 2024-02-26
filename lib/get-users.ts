import { redirect } from "next/navigation";
import { getSession } from "./session";
import { client } from "./client";

export type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export const getUsers = async (email: string) => {
  const session = await getSession()

  if (!session) {
    return redirect('/')
  }

  const query = 'SELECT id, name, email, created_at FROM users WHERE deleted_at IS NULL'
  const response = await client(query, []);

  return response as User[]
}