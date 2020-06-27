const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const localStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./config');
const User = require('./models/user');

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey:JWT_SECRET
}, async (payload, done) => {
    try{
        //find user with given token
        const user = await User.findById(payload.sub);

        //if user doesnt exist
        if(!user){
            return done(null, false);
        }

        //else
        done(null, user);
    } catch(error){
        done(error,false);
    }
}));

passport.use(new localStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try{
            //find user with given email
        const user = await User.findOne({ email });
        
        // if user doesnt exist
        if(!user){
            return done(null, false);
        }

        //check if password match or not
        const isMatch = await user.isValidPassword(password);

        //if not then
        if(!isMatch){
            return done(null, false);
        }
        // else
        done(null, user);
    
    }catch(error){
        done(error, false);
    }
}));