const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, select: true, required: true },
    username: { type: String, unique: true, lowercase: true, required: true },
    role: { type: String, required: true, enum: ['admin', 'user'] },
})

module.exports = mongoose.model('User', UserSchema)
