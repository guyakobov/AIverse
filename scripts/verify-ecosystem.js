
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function verify() {
    console.log('--- Verifying Ecosystem Category ---');
    try {
        const { rows: categories } = await pool.query('SELECT DISTINCT category FROM tools');
        console.log('Categories in database:', categories.map(c => c.category).join(', '));

        const { rows: ecosystemTools } = await pool.query("SELECT name, category FROM tools WHERE category = 'Ecosystem'");
        console.log('\nTools in Ecosystem category:');
        ecosystemTools.forEach(t => console.log(` - ${t.name}`));

        console.log('\nTesting Search for "Ecosystem":');
        const queryText = `
            SELECT name, category FROM tools 
            WHERE 
                similarity(LOWER(category), $1) > 0.1 OR
                EXISTS (SELECT 1 FROM unnest(tags) tag WHERE word_similarity($1, LOWER(tag)) > 0.4)
            LIMIT 5
        `;
        const { rows: searchResults } = await pool.query(queryText, ['ecosystem']);
        searchResults.forEach(r => console.log(` - ${r.name} (${r.category})`));

    } catch (error) {
        console.error('Verification error:', error);
    } finally {
        await pool.end();
    }
}

verify();
