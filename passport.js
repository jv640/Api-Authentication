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
}, async (email, password, done) =>{
    //find user with given email
    const user = User.findOne({ email });
    
    // if user doesnt exist
    if(!user){
        return done(null, false);
    }
}))