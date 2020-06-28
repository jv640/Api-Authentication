const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// create a schema
const userSchema = new Schema({
    method:{
        type:String,
        enum:['local', 'google', 'facebook'],
        required: true
    },
    local:{
        email: {
            type: String,
            lowercase:true
        },
        password: {
            type: String,
        }
    },
    google:{
        id:{
            type:String
        },
        email:{
            type:String,
            lowercase:true
        }
    },
    facebook:{
        id:{
            type:String
        },
        email:{
            type:String,
            lowercase:true
        }
    }
    
});

userSchema.pre('save', async function (next) {
    try{
        if(this.method !== 'local'){
            next();
        }
        // generate salt 
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        this.local.password = passwordHash;
        // console.log('salt', salt);
        // console.log('normal password', this.password);
        // console.log('hashed password', passwordHash);
    } catch(error){
        next(error);
    }
})

userSchema.methods.isValidPassword = async function (newPassword){
    try{
        return await bcrypt.compare(newPassword, this.local.password);
    }catch(error){
        throw new Error(error);
    }
}
// create a model
const User = mongoose.model('user', userSchema);        //User is our model and we have to put singular name bcz mngs change it to plural itself

//export the model
module.exports = User;