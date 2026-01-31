
import pool from './db';

export default async function handler(req, res) {
    try {
        const { rows } = await pool.query('SELECT * FROM tools');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Failed to fetch tools' });
    }
}
