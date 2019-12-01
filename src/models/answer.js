const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
    description: { type: String, required: true },
    numVotes: { type: Number, default: 0 },
    idPublication: { type: String, required: true }
})

module.exports = mongoose.model('Answer', AnswerSchema)
