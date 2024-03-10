require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(`${process.env.MONGOURL}`)

const schema = mongoose.Schema({
    username: String,
    message: String,
    time:String
})

const signUpSchema = mongoose.Schema({
    username: String,
    password: String
})

const userData = mongoose.model('userData',schema)

const signUpData = mongoose.model('signUpData',signUpSchema)

module.exports = {
    userData,
    signUpData
}