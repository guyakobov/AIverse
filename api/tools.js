import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    try {
        const { q } = req.query;
        let queryText = `
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
        `;
        const queryParams = [];

        if (q) {
            const words = q.trim().split(/\s+/).filter(Boolean);
            if (words.length > 0) {
                const conditions = words.map((word, index) => {
                    const paramIndex = index + 1;
                    queryParams.push(`%${word}%`);
                    return `(
                        t.name ILIKE $${paramIndex} OR 
                        t.description ILIKE $${paramIndex} OR 
                        t.category ILIKE $${paramIndex} OR 
                        EXISTS (SELECT 1 FROM unnest(t.tags) tag WHERE tag ILIKE $${paramIndex})
                    )`;
                });
                queryText += ` WHERE ${conditions.join(' AND ')} `;
            }
        }

        queryText += `
            GROUP BY t.id
        `;
        const { rows } = await pool.query(queryText, queryParams);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({
            error: 'Failed to fetch tools',
            details: error.message
        });
    }
}
