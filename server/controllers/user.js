const JWT = require('jsonwebtoken');
const User = require("../models/user");
const { JWT_SECRET } = require('../config');

signToken = user => {       // fucntion to generate token
    return JWT.sign({
        iss: 'learningApi',     //issuer
        sub: user.id,           // subject by which we are encoding (try something wch doesnt change with time)
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);
}
module.exports = {
    signUp : async (req, res , next) => {
        const { email, password } = req.value.body;
        // check if user already exist or not
        const foundUser = await User.findOne({ "local.email": email });
        if(foundUser){
            return res.status(403).json({ error : 'Email is already in use'});
        }
        
        const newUser = new User({ 
            method: 'local',
            local:{
                email, password
            }
        });
        await newUser.save();

        //Generating Token for user
        const token = signToken(newUser);
        // responding with token
        res.status(200).json({token});
    },
    signIn : async (req, res , next) => {
        //generate token
        const token = signToken(req.user);
        res.status(200).json({ token });
        console.log('Succesfully loggen in!! ');
    },
    googleOAuth : async (req, res , next) => {
        //generate token
        const token = signToken(req.user);
        res.status(200).json({ token });    
    },
    facebookOAuth : async (req, res , next) => {
        //generate token
        const token = signToken(req.user);
        res.status(200).json({ token });    
    },
    
    secret : async (req, res , next) => {
        console.log('I got inside secret with help of tokens');
        res.status(200).json({ secret : "resource"});    


    }
}