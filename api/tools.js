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
            queryText += `
            WHERE 
                to_tsvector('english', 
                    t.name || ' ' || 
                    t.description || ' ' || 
                    t.category || ' ' || 
                    array_to_string(t.tags, ' ')
                ) @@ plainto_tsquery('english', $1)
            `;
            queryParams.push(q);
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
