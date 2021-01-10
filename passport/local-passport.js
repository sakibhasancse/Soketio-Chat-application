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
        const { username } = req.body
        if (!req.body.email || !req.body.password || !username) {
            return done(null, false, req.flash('error', 'All field are required'))
        }


        const newUser = new User()
        newUser.password = newUser.encryptPassword(req.body.password)
        newUser.email = req.body.email
        newUser.username = req.body.username
        newUser.save((err) => {
            if (err) {
                return done(err)
            }

            return done(null, newUser)

        })


    })
}))