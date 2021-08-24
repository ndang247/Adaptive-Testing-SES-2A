const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB(); //connect to mongo

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Started'));

const PORT = 5000 //default port

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // Start server on default port