const jwt = require('../services/jwt')
const User = require('../models/user')
const authValidator = require('../middlewares/auth_validator')

function register(req, res) {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        role: 'user'
    })

    authValidator.registerValidator(req, res, () => {
        const passwordHashed = res.locals.hash
        user.password = passwordHashed

        user.save((saveErr, savedUser) => {
            if (saveErr)
                res.status(500).send({ message: `Error: ${saveErr}` })
            
            res.status(201).send({ user: savedUser })
        })
    })
}

function login(req, res) {
    authValidator.loginValidator(req, res, () => {
        const email = req.body['email'].toLowerCase().trim()

        User.findOne({ email: email.toLowerCase().trim() }, (loginErr, user) => {
            if (loginErr)
                res.status(500).send({ message: `Error: ${loginErr}` })
            
            res.status(200).send({
                token: jwt.createToken(user)
            })
        })
    })
}

module.exports = {
    register,
    login
}