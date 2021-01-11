
const mongoose = require('mongoose')

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    contry: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: 'default.png'
    },
    fans: [
        {
            username: {
                type: String, default: ''
            },
            email: {
                type: String,
                default: ''
            }
        }
    ]

})

module.exports = mongoose.model('Clubs', clubSchema)