const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const localStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const config = require('./config/index');
const facebookTokenStrategy = require('passport-facebook-token');

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey:config.JWT_SECRET
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
    clientID: config.oauth.google.clientID,
    clientSecret: config.oauth.google.clientSecret
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


passport.use('facebookToken', new facebookTokenStrategy({ 
    clientID: config.oauth.facebook.clientID,
    clientSecret: config.oauth.facebook.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    try{
        console.log('access Token', accessToken);
        console.log('refresh Token', refreshToken);
        console.log('profile', profile);

        // Now whether this user already exist in database or not
        const existUser = await User.findOne({ "facebook.id": profile.id});
        if(existUser){
            console.log('User already exist in DB');
            return done(null, existUser);
            
        }
        // if new account
        console.log('User already dont exist in DB');

        const newUser = new User({
            method: 'facebook',
            facebook:{
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