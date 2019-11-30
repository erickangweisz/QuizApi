const Router = require('express')

const AuthRoutes = require('./auth')
const UserRoutes = require('./user')
const PublicationRoutes = require('./publication')

const router = Router()
const quizApiPath = '/quiz-api'

router.use(quizApiPath, UserRoutes)
router.use(quizApiPath, AuthRoutes)
router.use(quizApiPath, PublicationRoutes)

module.exports = router