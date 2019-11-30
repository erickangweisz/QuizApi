const Answer = require('../models/answer')

function createAnswer(req, res) {
    const answer = new Answer({
        description: req.body._description,
        idPublishing: req.body._idPublishing
    })

    answer.save((saveErr, answerSaved) => {
        if (saveErr)
            res.status(500).send({ message: `Error: ${saveErr}` })
        
        res.status(201).send({ answer : answerSaved })
    })
}

function getAnswerByPublicationId(req, res) {
    let publicationId = req.params.publicationId

    Answer.find({ _id: publicationId }, (err, answers) => {
        if (err) 
            return res.status(500).send({ message: `request error: ${err}` })
        if (!answers) 
            return res.status(404).send({ message: 'the answers dont exist' })

        res.status(200).send({ answers })
    })
}

function deleteAnswer(req, res) {
    let answerId = req.params.answerId

    Answer.findById(answerId, (err, answerDeleted) => {
        if (err) 
            res.status(500).send({ message: `error deleting the answer: ${err}` })

        answer.remove(err => {
            if (err) {
                res.status(500)
                    .send({ message: `error deleting answer: ${err}` })
            }
            res.status(200).send({ message: 'the answer has been deleted' })
        })
    })
}

module.exports = {
    createAnswer,
    getAnswerByPublicationId,
    deleteAnswer
}