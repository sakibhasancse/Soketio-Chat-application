module.exports = function () {
    return {
        setRouting: function (router) {
            router.get('/group/:groupname', this.getGroup)


        },
        getGroup: function (req, res) {
            return res.render('groupchat/group', { title: `Group - ${req.params.groupname}` })

        }
    }

}