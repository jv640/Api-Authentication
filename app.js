const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// MiddleWare
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/user'));


// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Server is running at ${PORT}`);