'use strict'

const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../model/user')


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})
console.log(process.env.GOOOLE_CLIENT_SECRET)

passport.use('google', new googleStrategy({

    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOOLE_CLIENT_SECRET,
    callbackURL: `${process.env.URL}/auth/google/callback`,
    passReqToCallback: true

}, (req, accessToken, refreshToken, profile, done) => {
    User.findOne({ google: profile.id }, (err, user) => {
        if (err) {
            console.log(err)
            return done(err)
        }
        if (user) {
            return done(null, user)
        } else {
            const newUser = new User();
            newUser.google = profile.id;
            newUser.username = profile.first_name;
            newUser.fullname = profile.displayName;
            newUser.email = profile.emails[0].value;
            newUser.userImage = profile._json.image ? rofile._json.image.url : '';
            newUser.save(err => {
                if (err) {
                    return done(err)
                }
                return done(null, newUser)
            })

        }





    })
}))