'use strict'
const validator = require('express-validator')

module.exports = function () {
    return {
        signupValidator: (req, res, next) => {
            req.checkBody('username', 'Username is required').notEmpty();
            req.checkBody('username', 'Username Name Must Be Less Then 2').isLength({ min: 5 })
            req.checkBody('email', 'email is required').notEmpty()
            req.checkBody('email', 'email is invalid').isEmail()
            req.checkBody('password', 'Password is required').notEmpty()
            req.checkBody('password', 'Password Must me Less then 5').isLength({ min: 6 })
            req.getValidationResult().then((result) => {
                const errors = result.array();
                const messages = []
                errors.forEach((err) => {
                    messages.push(err.msg)
                })
                req.flash('error', messages);
                res.redirect('/signup')
            }).catch(err => {
                return next()
            })
        }

    }
}
