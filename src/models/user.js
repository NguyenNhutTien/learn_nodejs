const { name } = require('ejs')
const mongoose = require('mongoose')
const schema = mongoose.Schema({
    email: String,
    name: String,
    city: String
})
const User = mongoose.model('users', schema)
module.exports = User