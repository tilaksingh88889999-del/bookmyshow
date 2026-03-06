const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
    connectionString: 'postgresql://postgres.shzbweipukigveyvekoi:MgNvzjj7dMmUyWlg@aws-1-ap-south-1.pooler.supabase.com:5432/postgres'
});

// Create table if not exists
pool.query(`
    CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`).then(() => console.log('Database table ready'));

// Get all customers
app.get('/api/customers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM customers ORDER BY timestamp DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new customer
app.post('/api/customers', async (req, res) => {
    const { fullName, email, phone } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO customers (full_name, email, phone) VALUES ($1, $2, $3) RETURNING *',
            [fullName, email, phone]
        );
        res.json({ success: true, customer: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
