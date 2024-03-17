import mysql from 'mysql2/promise';

const credential = {
    host: 'localhost',
    user: 'root',
    password: 'root', // La contraseña que estableciste en el Dockerfile
    database: 'erp', // El nombre de la base de datos que creaste en el Dockerfile
    port: 3307
}

interface QueryResult {
    rows: any;
    error: string | null;
}

export const client = async (query: string, variables: any[]): Promise<QueryResult> => {
    let connect;
    try {
        connect = await mysql.createConnection(credential);
        const [rows] = await connect.query(query, variables);
        return { rows, error: null };
    } catch (error) {
        return { rows: [], error: error.message };
    } finally {
        if (connect) {
            await connect.end();
        }
    }
}