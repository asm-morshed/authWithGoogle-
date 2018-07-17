var passport = require('passport');
var googleStrategy = require('passport-google-oauth20');

const User = require('../models/usermode');

passport.serializeUser((user, cb)=>{
    cb(null, user.id);
})
passport.deserializeUser((id, cb)=>{
    User.findById(id).then((user)=>{
        cb(null,user)
    })
})


passport.use(
    new googleStrategy({
    clientID:'759538168653-6jgeg1qarb1kjpb9sj6cadu6ofjcv6pm.apps.googleusercontent.com',
    clientSecret: 'OnE8FWosfQ0NiwSvvDyUcZQz',
    callbackURL: 'http://localhost:3000/auth/google/cb'
    },
    function(accessToken,refreshToken, profile,cb){
        console.log("After clicking for auth")
        console.log('Profile: ', profile.id)
        User.findOne({googleId:profile.id}).then((currentUser)=>{
            if(currentUser){
                console.log("user already exist")
                console.log(currentUser)
                cb(null,currentUser);
            }else{
                console.log("New user")
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then(function(newUser){
                    console.log('user created: ', newUser)
                    cb(null,newUser);
                })
            }
        })
        
        
    }
));


