const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PublicationSchema = new Schema({
    question: { type: String, required: true },
    published: { type: Boolean, default: true }
})

module.exports = mongoose.model('Publication', PublicationSchema)
