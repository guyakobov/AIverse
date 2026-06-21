
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function test() {
    try {
        const { rows } = await pool.query('SELECT features FROM tools WHERE id = 20');
        console.log('--- DB RESPONSE ---');
        console.log(JSON.stringify(rows[0], null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
}

test();
