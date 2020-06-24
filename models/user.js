const mongoose = require('mongoose');
const { schemas } = require('../helpers/routehelpers');
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
    email: String,
    password: String
});

// create a model
const User = mongoose.model('user', userSchema);        //User is our model and we have to put singular name bcz mngs change it to plural itself

//export the model
module.exports = User;