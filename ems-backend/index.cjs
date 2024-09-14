const express = require('express');
const connectDB = require('./config/database.cjs');
const cors = require('cors');
require('dotenv').config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes.cjs');
const eventRoutes = require('./routes/eventRoutes.cjs');

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})