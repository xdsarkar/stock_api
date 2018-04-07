const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const apiRouter = require('./routes/api');

// set up express app
const app = express();

// connect to mongodb
const mongoDB = 'mongodb://localhost/stocks';
mongoose.connect(mongoDB);

// as mongoose.Promise is deprecated
mongoose.Promise = global.Promise;

// get the default connection
const db = mongoose.connection;

// bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.use(express.static('public'));
app.use(bodyParser.json());

// create middleware - development environment
app.use(morgan('dev'));

// initialise routes
app.use('/api', apiRouter);

// listen for requests
const PORT = process.env.PORT || 4000;

// listening on port
app.listen(PORT, () => {
    console.log('Now listening for requests "X" on port => ', PORT);
});