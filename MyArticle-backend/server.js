const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myarticle'
});

connection.connect(error => {
  if (error) throw error;
  console.log("Connected to the database.");
});

app.post('/articles', upload.single('image'), (req, res) => {
  console.log('Received file:', req.file);
  console.log('Received body:', req.body);
  const { title, content, author } = req.body;
  const image = req.file ? 'uploads/' + req.file.filename : null;
  const query = 'INSERT INTO articles (title, content, image, author) VALUES (?, ?, ?, ?)';
  connection.query(query, [title, content, image, author], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).send(error);
    }
    res.status(201).json({ id: results.insertId });
  });
});

app.get('/articles', (req, res) => {
  connection.query('SELECT * FROM articles', (error, results) => {
    if (error) {
        console.error("Error fetching articles:", error);
        return res.status(500).send(error);
    }
    res.json(results);
  });
});

app.get('/articles/:id', (req, res) => {
  connection.query('SELECT * FROM articles WHERE id = ?', [req.params.id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.json(results[0]);
  });
});

app.put('/articles/:id', upload.single('image'), (req, res) => {
  const { title, content, author } = req.body;
  let query = 'UPDATE articles SET title = ?, content = ?, author = ? WHERE id = ?';
  const values = [title, content, author, req.params.id];

  if (req.file) {
    query = 'UPDATE articles SET title = ?, content = ?, image = ?, author = ? WHERE id = ?';
    values.splice(3, 0, 'uploads/' + req.file.filename); // Insert the image path before the author
  }

  connection.query(query, values, error => {
    if (error) return res.status(500).send(error);
    res.json({ message: 'Article updated successfully' });
  });
});

app.delete('/articles/:id', (req, res) => {
  connection.query('DELETE FROM articles WHERE id = ?', [req.params.id], (error) => {
    if (error) return res.status(500).send(error);
    res.json({ message: 'Article deleted' });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
