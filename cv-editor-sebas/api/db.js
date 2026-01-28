import pg from 'pg';

/**
 * Configuración del pool de conexiones a PostgreSQL.
 * Utiliza variables de entorno para seguridad.
 */
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

/**
 * Función helper para ejecutar consultas SQL.
 * @param {string} text - La consulta SQL.
 * @param {Array} params - Parámetros para la consulta (para evitar SQL Injection).
 */
export const query = (text, params) => pool.query(text, params);
