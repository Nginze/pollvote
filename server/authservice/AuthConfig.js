const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require('passport')
const User = require('../models/userModel')
require('dotenv').config()

passport.use(new GoogleStrategy({
    clientID:    process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {

        User.findOne({googleId: profile.id})
            .then((currentUser) => {
                if(currentUser){
                    done(null, currentUser)
                }
                else{
                    new User({
                        googleId: profile.id,
                        username: profile.displayName,
                        image: profile.picture,
                        votes:0
                    })
                        .save()
                        .then((newUser) => {done(null, newUser);console.log(newUser)})
                }
            })
       
        
  }
));

passport.serializeUser((user,done) =>{
    done(null, user)
})

passport.deserializeUser((user, done) =>{
    done(null, user)
})