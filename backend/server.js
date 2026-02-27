const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

// --- Middleware ---
// Use the standard cors middleware to allow all cross-origin requests.
// This is the most robust and simplest way to fix "Failed to fetch" errors.
app.use(cors());
app.use(express.json());


// --- In-memory "Database" ---
let complaints = [];
let waitingHallSeats = Array(30).fill(0).map((_, i) => ({
  id: i + 1,
  status: Math.random() > 0.6 ? 'booked' : 'available'
}));
let transportBookings = [];
let lostItems = [];
let foundItems = [];


// --- API Endpoints ---

// 0. Health Check
app.get('/', (req, res) => {
    res.status(200).send('Rail Sahayata backend is running!');
});

// 2. Complaint System
app.post('/api/complaints', (req, res) => {
    const complaint = { id: Date.now(), ...req.body, timestamp: new Date() };
    complaints.push(complaint);
    console.log('New Complaint:', complaint);
    res.status(201).json({ success: true, message: 'Complaint submitted successfully!', complaint });
});

// 3. Waiting Hall Booking
app.get('/api/waiting-hall/status', (req, res) => {
    res.json(waitingHallSeats);
});

app.post('/api/waiting-hall/book', (req, res) => {
    const { seatId } = req.body;
    const seat = waitingHallSeats.find(s => s.id === seatId);
    if (seat && seat.status === 'available') {
        seat.status = 'booked';
        res.json({ success: true, message: 'Seat booked successfully!' });
    } else {
        res.status(400).json({ success: false, message: 'Seat not available or already booked.' });
    }
});

// 4. Live Train Info
app.get('/api/train-info', (req, res) => {
    const { trainNumber } = req.query;
    if (!trainNumber) {
        return res.status(400).json({ message: 'Train number is required.' });
    }
    // Simulate finding train info
    res.json({
        name: 'Shatabdi Express',
        number: trainNumber,
        status: 'On Time',
        eta: '14:30',
        platform: '5',
    });
});

// 5. Post Train Booking
app.post('/api/transport/book', (req, res) => {
    const booking = { id: Date.now(), ...req.body, timestamp: new Date() };
    transportBookings.push(booking);
    console.log('New Transport Booking:', booking);
    res.status(201).json({ success: true, message: 'Booking confirmed!' });
});

// 6. Lost & Found
app.post('/api/lost-found/report-found', (req, res) => {
    const report = { id: Date.now(), ...req.body, timestamp: new Date() };
    foundItems.push(report);
    console.log('New Found Item Report:', report);
    res.status(201).json({ success: true, message: 'Report submitted.' });
});

app.post('/api/lost-found/report-lost', (req, res) => {
    const report = { id: Date.now(), ...req.body, timestamp: new Date() };

    // Simple matching logic: case-insensitive item name
    const potentialMatch = foundItems.find(
        found => found.itemName.toLowerCase() === report.itemName.toLowerCase()
    );

    if (potentialMatch) {
        console.log('Potential match found for lost item:', report.itemName);
        res.status(201).json({ success: true, matchFound: true, details: potentialMatch });
    } else {
        lostItems.push(report);
        console.log('New Lost Item Report (no match found):', report);
        res.status(201).json({ success: true, matchFound: false, message: 'Report submitted.' });
    }
});


app.listen(port, () => {
    console.log(`Rail Sahayata backend listening at http://localhost:${port}`);
});