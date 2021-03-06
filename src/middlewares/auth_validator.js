const validator = require('validator')
const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user')
const emailExistence = require('email-existence')

const authValidator = {
    registerValidator,
    loginValidator
}

function registerValidator(req, res, next) {
    const email = req.body.email
    const password = req.body.password
    const username = req.body.username

    if (!validator.isEmail(email)) {
        return res.status(400).send({
            message: `email is not valid`
        })
    }

    if (!validator.isLength(password, { min: 8 })) {
        return res.status(400).send({ 
            message: `password must have more than 8 characters` 
        })
    }
    
    if (!validator.isLength(username, { min: 4 })) {
        return res.status(400).send({
            message: `username must have more than 4 characters` 
        })
    }

    emailExistence.check(email, (err, resp) => {
        if (resp) {
            return res.status(400).send({
                message: `this email is already registered`
            })
        } else {
            bcrypt.hash(password, null, null, (err, hash) => {
                res.locals.hash = hash
                next()
            })
        }
    })
}

function loginValidator(req, res, next) {
    const email = req.body['email']
    const password = req.body['password']

    if (!validator.isEmail(email)) {
        return res.status(400).send({
            message: `email is not valid`
        })
    } else if (!validator.isLength(password, { min: 8 })) {
        return res.status(400).send({ 
            message: `password must have more than 8 characters` 
        })
    } else {
        User.findOne({ email: email.toLowerCase().trim() }, (err, user) => {
            if (user === null) {
                return res.status(400).send({ 
                    message: `email not exist`
                })
            } else {
                bcrypt.compare(password, user.password, (passErr, check) => {
                    if (check) {
                    next()
                    } else {
                        res.status(404).send({ message: `password is not correct` })
                    }
                })
            }
        })
    }
}

module.exports = authValidator