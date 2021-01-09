'use strict'

module.exports = function (_) {
    return {

        setRouter: function (router) {
            router.get('/', this.indexPage),
                router.get('/ragister', this.getsignup),
                router.get('/login', this.getsignin)
        },


        indexPage: function (req, res) {
            return res.render('feed/index', { title: 'Chat application' })

        },
        getsignup: function (params) {
            return res.render('auth/ragister', { title: 'Chat application' })
        },
        getsignin: function (params) {
            return res.render('auth/login', { title: 'Chat application' })
        }
    }

}