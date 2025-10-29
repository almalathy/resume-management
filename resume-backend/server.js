const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql2023',
  database: 'resume_app'
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL");
});

// ✅ API to save resume (with duplicate email check)
app.post('/api/resumes', (req, res) => {
  const {
    name, email, jobTitle, experience, skills,
    phone,currentSalary, expectedSalary,appliedPosition,nationality
  } = req.body;

  const checkSql = 'SELECT * FROM resumes WHERE email = ?';
  db.query(checkSql, [email], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error checking duplicates' });
    if (result.length > 0) return res.status(400).json({ message: 'Duplicate resume with same email!' });

    const insertSql = `
      INSERT INTO resumes (
        name, email, jobTitle, experience, skills,
        phone,currentSalary, expectedSalary, appliedPosition, nationality
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      name, email, jobTitle, experience, skills,
      phone,currentSalary, expectedSalary,appliedPosition,nationality
    ];

    db.query(insertSql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ message: 'Failed to save resume' });
      }
      res.status(200).json({ message: 'Resume saved successfully' });
    });
  });
});

// ✅ Search resumes by name, jobTitle, or experience
app.get('/api/resumes/search', (req, res) => {
  const { query } = req.query;
  const sql = `
    SELECT * FROM resumes 
    WHERE name LIKE ? OR jobTitle LIKE ? OR experience LIKE ?
  `;
  const values = [`%${query}%`, `%${query}%`, `%${query}%`];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Search error:', err);
      return res.status(500).send('Search failed');
    }
    res.json(results);
  });
});

// ✅ Delete resume by ID
app.delete('/api/resumes/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM resumes WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ message: 'Failed to delete resume' });
    }
    res.json({ message: 'Resume deleted successfully' });
  });
});

// ✅ Update (Edit) resume
app.put('/api/resumes/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, jobTitle, experience, skills, phone, currentSalary, expectedSalary, appliedPosition, nationality } = req.body;

  const sql = `
    UPDATE resumes 
    SET name=?, email=?, jobTitle=?, experience=?, skills=?, phone=?, currentSalary=?, expectedSalary=?, appliedPosition=?, nationality=? 
    WHERE id=?`;

  db.query(sql, [name, email, jobTitle, experience, skills, phone, currentSalary, expectedSalary, appliedPosition, nationality, id], (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ message: 'Failed to update resume' });
    }
    res.json({ message: 'Resume updated successfully' });
  });
});


app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
