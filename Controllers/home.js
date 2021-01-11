const { response } = require("express")


module.exports = function (async, Club, _) {
    return {
        setRouting: function (router) {
            router.get('/', this.getHome)
        },
        getHome: async (req, res) => {

            await Club.find().then(result => {
                Club.aggregate([{

                    $group: {
                        _id: "$country"
                    }
                }
                ], (err, result2) => {

                    result2 = _.sortBy(result2, '_id')

                    return res.render('feed/home', { title: 'Chat application', data: result, data2: result2 })
                })

            }).catch(err => {
                console.log(err)
            })


        },

    }
}