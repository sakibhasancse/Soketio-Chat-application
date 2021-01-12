module.exports = function () {
    return {
        setRouting: function (router) {
            router.get('/group/:groupname', this.getGroup)


        },
        getGroup: function (req, res) {
            const name = req.params.groupname
            return res.render('groupchat/group', { title: `Group - ${name}`, name: req.user, groupname: name })

        }
    }

}