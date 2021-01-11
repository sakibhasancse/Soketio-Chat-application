const { response } = require("express")


module.exports = function (async, Club, _) {
    return {
        setRouting: function (router) {
            router.get('/', this.getHome)
        },
        getHome: async (req, res) => {
            await Club.find().then(result => {

                return res.render('feed/home', { title: 'Chat application', data: result })
            }).catch(err => {
                console.log(err)
            })


        },

    }
}