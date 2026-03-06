const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres.shzbweipukigveyvekoi:MgNvzjj7dMmUyWlg@aws-1-ap-south-1.pooler.supabase.com:5432/postgres'
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Database connected successfully!');
    
    const result = await client.query('SELECT NOW()');
    console.log('Current time from database:', result.rows[0].now);
    
    client.release();
    await pool.end();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
}

testConnection();
