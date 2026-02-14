import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    try {
        const { rows } = await pool.query(`
            SELECT 
                t.*,
                COALESCE(
                    json_agg(
                        json_build_object('platform', tl.platform, 'url', tl.url)
                    ) FILTER (WHERE tl.id IS NOT NULL),
                    '[]'
                ) as links
            FROM tools t
            LEFT JOIN tool_links tl ON t.id = tl.tool_id
            GROUP BY t.id
        `);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({
            error: 'Failed to fetch tools',
            details: error.message
        });
    }
}
