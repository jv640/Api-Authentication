const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const localStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./config');
const User = require('./models/user');
const GooglePlusTokenStrategy = require('passport-google-plus-token');

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

// Google OAuth Token strategy
passport.use('googleToken', new GooglePlusTokenStrategy({ 
    clientID:'131415360374-euf9stb2tkspmf4jah6r5oa00a5i368q.apps.googleusercontent.com',
    clientSecret: 'qgkR4ITBcrsg7c101o-OgoMj'
}, async (accessToken, refreshToken, profile, done) => {
    try{
        // console.log('access Token', accessToken);
        // console.log('refresh Token', refreshToken);
        // console.log('profile', profile);

        //Now whether this user already exist in database or not
        const existUser = await User.findOne({ "google.id": profile.id});
        if(existUser){
            console.log('User already exist in DB');
            return done(null, existUser);
            
        }
        // if new account
        console.log('User already dont exist in DB');

        const newUser = new User({
            method: 'google',
            google:{
                id: profile.id,
                email: profile.emails[0].value
            }
        });

        await newUser.save();
        done(null, newUser);

    } catch(error){
        done(error, false, error.message);
    }
    
}));

passport.use(new localStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try{
            //find user with given email
        const user = await User.findOne({"local.email": email });
        
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