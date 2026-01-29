import { query } from './db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro_dev';

/**
 * Handler para autenticación (Login y Registro).
 * Vercel Serverless Function.
 */
export default async function handler(req, res) {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { action, email, password } = req.body;

    try {
        if (req.method === 'POST') {
            if (action === 'register') {
                // Validación básica
                if (!email || !password) return res.status(400).json({ error: 'Email y contraseña requeridos' });

                // Hash de contraseña
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);

                // Guardar usuario (SQL Injection protegido por query params)
                const result = await query(
                    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
                    [email, hash]
                );

                return res.status(201).json({ message: 'Usuario creado', user: result.rows[0] });
            }

            else if (action === 'login') {
                const result = await query('SELECT * FROM users WHERE email = $1', [email]);
                const user = result.rows[0];

                if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

                const isMatch = await bcrypt.compare(password, user.password_hash);
                if (!isMatch) return res.status(401).json({ error: 'Credenciales inválidas' });

                // Crear token JWT
                const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

                return res.status(200).json({ token, user: { id: user.id, email: user.email } });
            }
        }

        return res.status(400).json({ error: 'Acción no soportada' });

    } catch (error) {
        console.error('Error Auth:', error);
        // Evitar enviar detalles del error de BD al cliente
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
