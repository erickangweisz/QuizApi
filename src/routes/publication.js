const Router = require('express')
const publicationController = require('../controllers/publication')

const router = new Router()

router.get('/publications', publicationController.getPublications)

module.exports = router