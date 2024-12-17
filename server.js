const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'railway_reservation'
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Fetch trains
app.get('/api/trains', (req, res) => {
  const query = 'SELECT * FROM trains';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching trains:', err);
      res.status(500).send('Error fetching trains');
      return;
    }
    res.json(result);
  });
});

// Fetch passengers
app.get('/api/passengers', (req, res) => {
  const query = 'SELECT * FROM passengers';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching passengers:', err);
      res.status(500).send('Error fetching passengers');
      return;
    }
    res.json(result);
  });
});

// Fetch coaches
app.get('/api/coaches', (req, res) => {
  const query = 'SELECT * FROM coaches';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching coaches:', err);
      res.status(500).send('Error fetching coaches');
      return;
    }
    res.json(result);
  });
});

// Fetch reservations
app.get('/api/reservations', (req, res) => {
  const query = 'SELECT * FROM reservations';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching reservations:', err);
      res.status(500).send('Error fetching reservations');
      return;
    }
    res.json(result);
  });
});

// Book a ticket
app.post('/api/book-ticket', (req, res) => {
  const { passenger_id, train_no, coach_no, seat_no, fare } = req.body;
  const query = `
    INSERT INTO reservations (train_no, coach_no, passenger_id, seat_no, fare, booking_status)
    VALUES (?, ?, ?, ?, ?, 'Booked')`;
  db.query(query, [train_no, coach_no, passenger_id, seat_no, fare], (err, result) => {
    if (err) {
      console.error('Error booking ticket:', err);
      res.status(500).send('Error booking ticket');
      return;
    }
    res.json({ message: 'Ticket booked successfully' });
  });
});

// Cancel a ticket
app.post('/api/cancel-ticket', (req, res) => {
  const { pnr_no } = req.body;
  const query = 'DELETE FROM reservations WHERE pnr_no = ?';
  db.query(query, [pnr_no], (err, result) => {
    if (err) {
      console.error('Error canceling ticket:', err);
      res.status(500).send('Error canceling ticket');
      return;
    }
    res.json({ message: 'Ticket canceled successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
