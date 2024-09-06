
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const todoRouter = require('./routes/todo');

// Connect to MongoDB
mongoose.connect('mongodb://host.docker.internal:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middleware
app.use(express.json());

// Routes
app.use('/todos', todoRouter);

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
