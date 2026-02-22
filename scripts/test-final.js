
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function testSearch(q) {
    console.log(`\n--- Testing Final API Logic for: "${q}" ---`);
    try {
        const queryText = `
            SELECT 
                t.name, t.category, 
                GREATEST(
                    similarity(LOWER(t.name), $1) * 2.0, 
                    word_similarity($1, LOWER(t.description)), 
                    similarity(LOWER(t.category), $1) * 1.5,
                    (SELECT COALESCE(MAX(word_similarity($1, LOWER(tag))), 0) FROM unnest(t.tags) tag)
                ) as score
            FROM tools t
            WHERE 
                similarity(LOWER(t.name), $1) > 0.1 OR 
                word_similarity($1, LOWER(t.description)) > 0.3 OR 
                similarity(LOWER(t.category), $1) > 0.1 OR 
                EXISTS (SELECT 1 FROM unnest(t.tags) tag WHERE word_similarity($1, LOWER(tag)) > 0.4)
            ORDER BY score DESC
            LIMIT 5
        `;

        const { rows } = await pool.query(queryText, [q.toLowerCase()]);
        console.log(`Found ${rows.length} results.`);
        rows.forEach(r => console.log(` - ${r.name} (${r.category}) [Score: ${r.score?.toFixed(3)}]`));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function runTests() {
    await testSearch('video generator');
    await testSearch('vdeo');
    await testSearch('chatgpt image');
    await pool.end();
}

runTests();
