const mongoose = require('mongoose');
const { schemas } = require('../helpers/routehelpers');
const { string } = require('@hapi/joi');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// create a schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    password: {
        type: String,
        required:true
    }
});

userSchema.pre('save', async function (next) {
    try{
        // generate salt 
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
        // console.log('salt', salt);
        // console.log('normal password', this.password);
        // console.log('hashed password', passwordHash);
    } catch(error){
        next(error);
    }
})

userSchema.methods.isValidPassword = async function (newPassword){
    try{
        return await bcrypt.compare(newPassword, this.password);
    }catch(error){
        throw new Error(error);
    }
}
// create a model
const User = mongoose.model('user', userSchema);        //User is our model and we have to put singular name bcz mngs change it to plural itself

//export the model
module.exports = User;