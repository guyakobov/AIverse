import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, description, category, url, pricing, tags } = req.body;

        if (!name || !description || !category || !url) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = await sql`
            INSERT INTO suggestions (name, description, category, url, pricing, tags)
            VALUES (${name}, ${description}, ${category}, ${url}, ${pricing}, ${tags})
            RETURNING id;
        `;

        res.status(201).json({
            success: true,
            message: 'Suggestion submitted successfully',
            id: result.rows[0].id
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({
            error: 'Failed to submit suggestion',
            details: error.message
        });
    }
}
