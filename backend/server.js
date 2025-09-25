const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// --- MIDDLEWARE SETUP ---
// Enable Cross-Origin Resource Sharing
app.use(cors());

// THIS IS THE CRITICAL LINE: It parses incoming JSON requests and puts the parsed data in req.body
// IT MUST BE BEFORE the app.use('/api/auth', ...) line.
app.use(express.json());

// --- DEFINE ROUTES ---
// All routes starting with /api/auth will be handled by this router
app.use('/api/auth', require('./routes/authRoutes'));

// --- SERVER STARTUP ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));