import pool from './db.js';

export default async function handler(req, res) {
    try {
        const client = await pool.connect();
        const { rows } = await client.query('SELECT * FROM tools');
        client.release();
        res.status(200).json(rows);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({
            error: 'Failed to fetch tools',
            details: error.message
        });
    }
}
