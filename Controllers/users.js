'use strict'

module.exports = function (_, passport, userValidator) {
    return {

        setRouting: function (router) {

            router.get('/signup', this.getsignup);
            router.post('/signup', userValidator.signupValidator, this.postRagister);
            router.get('/auth/facebook', this.getFacebookAuth);
            router.get('/auth/facebook/callback', this.facebookLogin)
            router.get('/auth/google', this.getGoogleAuth);
            router.get('/auth/google/callback', this.googleLogin)


            router.get('/home', this.homePage);
            router.get('/login', this.getsignin);
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
        getFacebookAuth: passport.authenticate('facebook', {
            scope: 'email'
        })
        ,
        facebookLogin: passport.authenticate('facebook', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        })
        ,
        getGoogleAuth: passport.authenticate('google', {
            // scope: ['https://www.googleapis.com/auth/plus.login', 'https://wwww.googleapis.com/auth/plus.profile.emails.read']
            scope: ['profile', 'email']

        })
        ,
        googleLogin: passport.authenticate('google', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        })
        ,
        homePage: function name(req, res) {
            return res.render('feed/home')
        },
        getsignin: function (req, res) {
            return res.render('auth/login', { title: 'Chat application' })
        }
    }

}