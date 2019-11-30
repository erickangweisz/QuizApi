const Router = require('express')
const publicationController = require('../controllers/publication')
const auth = require('../middlewares/authenticated')

const router = new Router()

router.post(
    '/publication', 
    auth.ensureAuth, 
    publicationController.createPublication
)
router.get(
    '/publications', 
    publicationController.getPublications
)
router.get(
    '/publication/:publicationId', 
    publicationController.getPublicationById
)
router.put(
    '/publication/:publicationId', 
    auth.ensureAuth, 
    publicationController.updatePublication
)
router.delete(
    '/publication/:publicationId', 
    auth.ensureAuth, 
    publicationController.deletePublication
)

module.exports = router
