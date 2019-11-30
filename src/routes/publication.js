const Router = require('express')
const publicationController = require('../controllers/publication')

const router = new Router()

router.post('/publication', publicationController.createPublication)
router.get('/publications', publicationController.getPublications)
router.get('/publication/:publicationId', publicationController.getPublicationById)
router.put('/publication/:publicationId', publicationController.updatePublication)
router.delete('/publication/:publicationId', publicationController.deletePublication)

module.exports = router
