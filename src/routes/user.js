const Router = require('express')
const userController = require('../controllers/users')

const router = new Router()

router.get('/users', userController.getUsers)
router.get('/user/:userId', userController.getUserById)
router.put('/user', userController.updateUser)
router.delete('/user/:userId', userController.deleteUser)

module.exports = router
