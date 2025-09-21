
const express = require("express")
const connection = require("./database/db")
const authRoute = require("./routes/auth.js")
const bugsRoute = require("./routes/bugs.js")
const cors = require("cors")
require("dotenv").config()


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/bugs',bugsRoute);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Bug Tracker API is running' });
});

app.listen(PORT, async() => {
 connection()
  console.log(`Server running on port ${PORT}`);
});