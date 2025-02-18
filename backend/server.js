require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
    res.send('OptiCare Backend is running 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
