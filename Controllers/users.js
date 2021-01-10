'use strict'

module.exports = function (_, passport, userValidator) {
    return {

        setRouter: function (router) {
            router.get('/', this.indexPage);
            router.get('/signup', this.getsignup);
            router.post('/signup', userValidator.signupValidator, this.postRagister);
            router.get('/home', this.homePage);
            router.get('/login', this.getsignin);
        },


        indexPage: function (req, res) {
            return res.render('feed/index', { title: 'Chat application' })

        },
        getsignup: function (req, res) {
            const errors = req.flash('error')
            return res.render('auth/ragister', { title: 'Chat application', messages: errors, hasErrors: errors.length > 0 })
        },
        postRagister: passport.authenticate('local.signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),
        homePage: function name(req, res) {
            return res.render('feed/home')
        },
        getsignin: function (req, res) {
            return res.render('auth/login', { title: 'Chat application' })
        }
    }

}