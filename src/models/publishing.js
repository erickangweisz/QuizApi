const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PublishingSchema = new Schema({
    question: { type: String, required: true },
    published: { type: boolean, default: true }
})

module.exports = mongoose.model('Publishing', PublishingSchema)
