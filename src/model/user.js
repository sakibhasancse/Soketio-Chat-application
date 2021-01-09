const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,

        unique: true,

    },
    fullname: {
        type: String,
        required: true,
        unique: true,
        default: ''

    },
    email: {
        type: String,
        required: true
    },
    userImage: {
        type: Buffer,
        default: 'default.png'
    },
    facebook: {
        default: '',
        type: String
    },
    fbToken: Array,

    google: {
        default: '',
        type: String
    },
    googleToken: Array

})

module.exports = mongoose.model('User', UserSchema)