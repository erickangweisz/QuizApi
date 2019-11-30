const Router = require('express')
const answerController = require('../controllers/answer')
const auth = require('../middlewares/authenticated')

const router = new Router()

router.post(
    '/answer', 
    auth.ensureAuth, 
    answerController.createAnswer
)
router.get(
    '/answers/:publicationId', 
    answerController.getAnswerByPublicationId
)
router.delete(
    '/answer/:answerId', 
    auth.ensureAuth, 
    answerController.deleteAnswer
)

module.exports = router
