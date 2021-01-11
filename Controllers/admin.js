const path = require('path')
const fs = require('fs')
const slug = require('slug')


module.exports = function (formidable, Club) {
    return {
        setRouting: function (router) {
            router.get('/dashbord', this.getDashbord);
            router.post('/uploadsfile', this.uploadFile);
            router.post('/dashbord', this.postDashbord);

        },
        getDashbord: function (req, res) {
            return res.render('admin/dashbord', { title: 'Admin Dashbord' })

        },
        postDashbord: async (req, res) => {
            const { club, country, upload } = req.body

            const newclub = new Club({ club, country, image: upload, clubslug: slug(club) })

            await newclub.save((err) => {
                if (err) {
                    return res.send('somthing went wrong')
                }
                return res.redirect('/dashbord')
            })

        }
        ,
        uploadFile: (req, res) => {
            const form = new formidable.IncomingForm()

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