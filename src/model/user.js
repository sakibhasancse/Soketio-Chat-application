const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
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
        default: 'default.png',
        buffer: String
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