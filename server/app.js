const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost/APIauthentication', {useNewUrlParser: true, useUnifiedTopology: true} );

const app = express();
app.use(cors());

// MiddleWare
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/user'));

module.exports = app;

