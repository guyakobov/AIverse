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
            const lowQ = q.toLowerCase();
            queryText += `
            WHERE 
                similarity(LOWER(t.name), $1) > 0.1 OR 
                word_similarity($1, LOWER(t.description)) > 0.3 OR 
                similarity(LOWER(t.category), $1) > 0.1 OR 
                EXISTS (SELECT 1 FROM unnest(t.tags) tag WHERE word_similarity($1, LOWER(tag)) > 0.4)
            `;
            queryParams.push(lowQ);
        }

        if (q) {
            queryText += `
                GROUP BY t.id
                ORDER BY GREATEST(
                    similarity(LOWER(t.name), $1) * 2.0, 
                    word_similarity($1, LOWER(t.description)), 
                    similarity(LOWER(t.category), $1) * 1.5,
                    (SELECT COALESCE(MAX(word_similarity($1, LOWER(tag))), 0) FROM unnest(t.tags) tag)
                ) DESC
            `;
        } else {
            queryText += `
                GROUP BY t.id
            `;
        }

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
