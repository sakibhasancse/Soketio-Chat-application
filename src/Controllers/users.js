'use strict'

module.exports = function (_, passport) {
    return {

        setRouter: function (router) {
            router.get('/', this.indexPage);
            router.get('/ragister', this.getsignup);
            router.post('/ragister', this.postRagister);
            router.get('/home', this.homePage);
            router.get('/login', this.getsignin);
        },


        indexPage: function (req, res) {
            return res.render('feed/index', { title: 'Chat application' })

        },
        getsignup: function (params) {
            return res.render('auth/ragister', { title: 'Chat application' })
        },
        postRagister: passport.authenticate('local.signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),
        homePage: function name(params) {
            return res.render('feed/home')
        },
        getsignin: function (params) {
            return res.render('auth/login', { title: 'Chat application' })
        }
    }

}