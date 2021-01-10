'use strict'

const passport = require('passport')
const facebookStrategy = require('passport-facebook').Strategy
const User = require('../model/user')


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})
console.log(process.env.FB_CLIENTID)

passport.use('facebook', new facebookStrategy({

    clientID: process.env.FB_CLIENTID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    profileFields: ['email', 'displayName', 'photos'],
    callbackURL: `${process.env.URL}/auth/facebook/callback`,
    passReqToCallback: true

}, (req, token, refreshToken, profile, done) => {
    User.findOne({ facebook: profile.id }, (err, user) => {
        if (err) {
            console.log(err)

            return done(err)

        }
        if (user) {
            return done(null, user)
        } else {
            const newUser = new User()
            newUser.facebook = profile.id,
                newUser.fullname = profile.displayName,
                newUser.email = profile._json.email,
                newUser.userImage = 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
            newUser.fbTokens.push({ token: token })

            console.log(token)
            console.log(newUser)
            newUser.save((err) => {
                console.log(err)

                return done(null, user)
            })
        }





    })
}))