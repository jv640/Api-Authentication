const User = require("../models/user");

module.exports = {
    signUp : async (req, res , next) => {
        console.log('User Controller SignUp called !');
        
        const { email, password } = req.value.body;
        const newUser = new User({ email, password });
        await newUser.save();

        res.json({ user : 'created'});
    
    },
    signIn : async (req, res , next) => {
        console.log('User Controller SignIn called !!');
    },
    secret : async (req, res , next) => {
        console.log('User Controller Secret called !!');
    }
}