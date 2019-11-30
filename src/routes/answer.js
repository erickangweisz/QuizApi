const Router = require('express')
const answerController = require('../controllers/answer')

const router = new Router()

router.post('/answer', answerController.createAnswer)
router.get('/answers/:publicationId', answerController.getAnswerByPublicationId)
router.delete('/answer/:answerId', answerController.deleteAnswer)

module.exports = router
