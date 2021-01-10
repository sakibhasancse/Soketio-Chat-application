'use strict'

const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const User = require('../model/user')
const bcrypt = require('bcrypt')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

passport.use('local.signup', new passportLocal({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ email }, (err, user) => {
        if (err) {
            return done(err)
        }
        if (user) {
            return done(null, false, req.flash('error', 'User with email already exist'))
        }
        const { email, password, username } = req.body
        if (!email || !password || !username) {
            return done(null, false, req.flash('error', 'All field are required'))
        }
        password = bcrypt.hash(password, 12)

        const newUser = new User({ email, password, username })



        newUser.save((err) => {
            if (err) {
                return done(err)
            }

            return done(null, newUser)

        })
    })
}))