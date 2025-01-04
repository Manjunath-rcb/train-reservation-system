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
  password: '1234', // Replace with your actual DB password
  database: 'railway_system'
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
      return res.status(500).send('Error fetching trains');
    }
    if (result.length === 0) {
      return res.status(404).send('No trains found');
    }
    res.json(result);
  });
});

// Add Train (Server-side)
app.post('/add-train', (req, res) => {
  const { train_no, name, source, destination, departure, arrival, total_coaches } = req.body;

  // Validate required fields
  if (!train_no || !name || !source || !destination || !departure || !arrival || !total_coaches) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Validate time format for departure and arrival
  const timeRegex = /^([0-9]{2}):([0-9]{2})$/; // HH:MM format
  if (!timeRegex.test(departure) || !timeRegex.test(arrival)) {
    return res.status(400).json({ message: 'Departure and Arrival times must be in HH:MM format.' });
  }

  // Ensure total_coaches is a valid number and greater than 0
  if (isNaN(total_coaches) || total_coaches <= 0) {
    return res.status(400).json({ message: 'Total Coaches must be a positive integer.' });
  }

  // Prepare the query to insert data into the database
  const query = 'INSERT INTO trains (train_no, train_name, source, destination, departure_time, arrival_time, total_coaches) VALUES (?, ?, ?, ?, ?, ?, ?)';

  // Execute the query
  db.query(query, [train_no, name, source, destination, departure, arrival, total_coaches], (err, result) => {
    if (err) {
      console.error('Error adding train:', err);
      return res.status(500).json({ message: 'Error adding train', error: err.message });
    }

    // Respond with success
    res.json({ message: 'Train added successfully!', train_id: result.insertId });
  });
});



// Fetch coaches
app.get('/api/coaches', (req, res) => {
  const query = 'SELECT * FROM coaches';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching coaches:', err);
      return res.status(500).send('Error fetching coaches');
    }
    if (result.length === 0) {
      return res.status(404).send('No coaches found');
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
      return res.status(500).send('Error fetching passengers');
    }
    if (result.length === 0) {
      return res.status(404).send('No passengers found');
    }
    res.json(result);
  });
});

// Add Passenger
app.post('/add-passenger', (req, res) => {
  const { name, age, gender, contact_no } = req.body;

  if (!name || !age || !gender || !contact_no) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const query = 'INSERT INTO passengers (passenger_name, age, gender, contact_no) VALUES (?, ?, ?, ?)';
  db.query(query, [name, age, gender, contact_no], (err, result) => {
    if (err) {
      console.error('Error adding passenger:', err);
      return res.status(500).send('Error adding passenger');
    }
    res.json({ message: 'Passenger added successfully!' });
  });
});

// Fetch reservations
app.get('/api/reservations', (req, res) => {
  const query = 'SELECT * FROM reservations';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching reservations:', err);
      return res.status(500).send('Error fetching reservations');
    }
    if (result.length === 0) {
      return res.status(404).send('No reservations found');
    }
    res.json(result);
  });
});

// Book ticket
app.post('/book-ticket', (req, res) => {
  const { passenger_id, train_no, coach_no, seat_no, fare } = req.body;

  if (!passenger_id || !train_no || !coach_no || !seat_no || !fare) {
    return res.status(400).json({ message: 'All fields are required for booking.' });
  }

  const query = 'INSERT INTO reservations (passenger_id, train_no, coach_no, seat_no, fare, booking_status) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [passenger_id, train_no, coach_no, seat_no, fare, 'Confirmed'], (err, result) => {
    if (err) {
      console.error('Error booking ticket:', err);
      return res.status(500).send('Error booking ticket');
    }
    res.json({ message: 'Ticket booked successfully!' });
  });
});

// Cancel ticket
app.post('/cancel-ticket', (req, res) => {
  const { pnr_no } = req.body;

  if (!pnr_no) {
    return res.status(400).json({ message: 'PNR number is required.' });
  }

  const query = 'DELETE FROM reservations WHERE pnr_no = ?';
  db.query(query, [pnr_no], (err, result) => {
    if (err) {
      console.error('Error canceling ticket:', err);
      return res.status(500).send('Error canceling ticket');
    }
    res.json({ message: 'Ticket canceled successfully!' });
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
