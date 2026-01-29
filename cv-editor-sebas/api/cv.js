import { query } from './db.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro_dev';

/**
 * Middleware simulado para validar token.
 */
const verifyToken = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;
    const token = authHeader.split(' ')[1];
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (e) {
        return null;
    }
};

/**
 * Handler para datos del CV (Obtener y Guardar).
 */
export default async function handler(req, res) {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Verificar autenticación
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'No autorizado' });

    try {
        if (req.method === 'GET') {
            const result = await query('SELECT data FROM cv_data WHERE user_id = $1', [user.id]);
            if (result.rows.length === 0) return res.status(404).json({ message: 'No hay CV guardado' });
            return res.status(200).json(result.rows[0].data);
        }

        if (req.method === 'POST') {
            const { data } = req.body;

            // Upsert: Insertar o Actualizar si ya existe
            // Nota: Postgres soporta ON CONFLICT
            const result = await query(
                `INSERT INTO cv_data (user_id, data, updated_at) 
         VALUES ($1, $2, NOW()) 
         ON CONFLICT (user_id) 
         DO UPDATE SET data = $2, updated_at = NOW() 
         RETURNING id`,
                [user.id, data]
            );

            return res.status(200).json({ message: 'CV guardado exitosamente', id: result.rows[0].id });
        }

        return res.status(405).json({ error: 'Método no permitido' });

    } catch (error) {
        console.error('Error CV:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
