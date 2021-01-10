const { min } = require('lodash')
const mongoose = require('mongoose')
const passport = require('passport')
const bcryptJs = require('bcrypt-nodejs')
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,

    },
    fullname: {
        type: String,
        default: ''

    },
    email: {
        type: String,
        required: true
    }, password: {
        type: String,

        min: [6, 'password minimum 5 chr']

    },
    userImage: {
        type: String,
        default: 'default.png'
    },
    facebook: {
        default: '',
        type: String
    },
    fbTokens: Array,

    google: {
        default: '',
        type: String
    },
    googleToken: Array

})


UserSchema.methods.encryptPassword = function (password) {
    return bcryptJs.hashSync(password, bcryptJs.genSaltSync(10), null)
}
UserSchema.methods.validUserPassword = function (password) {
    return bcryptJs.compareSync(password, this.password)
}
module.exports = mongoose.model('User', UserSchema)