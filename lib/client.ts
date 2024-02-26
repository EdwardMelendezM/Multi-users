import mysql from 'mysql2/promise';

const credential = {
  host: 'localhost',
  user: 'root',
  password: 'root', // La contraseña que estableciste en el Dockerfile
  database: 'erp', // El nombre de la base de datos que creaste en el Dockerfile
  port: 3307
}

export const client = async (query: string, variables: any[]) => {
  const connect = await mysql.createConnection(credential)
  try {
    const [rows] = await connect.query(query, variables)
    return rows
  } catch (error) {
    console.log(error);
  } finally {
    await connect.end();
  }
}