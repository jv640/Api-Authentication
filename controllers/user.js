const User = require("../models/user");

module.exports = {
    signUp : async (req, res , next) => {
        const { email, password } = req.value.body;
        // check if user already exist or not
        const foundUser = await User.findOne({ email });
        if(foundUser){
            return res.status(403).json({ error : 'Email is already in use'});
        }
        
        const newUser = new User({ email, password });
        await newUser.save();

        res.json({ user : 'created'});
    },
    signIn : async (req, res , next) => {

    },
    secret : async (req, res , next) => {

    }
}