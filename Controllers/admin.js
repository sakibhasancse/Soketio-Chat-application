const path = require('path')
const fs = require('fs')

module.exports = function (formidable) {
    return {
        setRouting: function (router) {
            router.get('/dashbord', this.getDashbord);
            router.post('/uploadsfile', this.uploadFile)
        },
        getDashbord: function (req, res) {
            return res.render('admin/dashbord', { title: 'Admin Dashbord' })

        },
        uploadFile: (req, res) => {
            const form = new formidable.IncomingForm()
            console.log(form)
            form.uploadDir = path.join(__dirname, '../public/uploads')
            form.on('file', (files, file) => {
                fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
                    if (err) throw err,
                        console.log('file renamed successfully')
                })
            })
            form.on('error', (err) => {
                console.log(err)
            })
            form.on('end', () => {
                console.log('file upload successfully')
            })
            form.parse(req)
            // console.log(req)
        }
    }
}