const jwt = require('jwt-simple')
const moment = require('moment')
const config = ('../config')

const Auth = {
    ensureAuth
}

function ensureAuth(req, res, next) {
    if (!req.headers.authorization)
        return res.status(403).send({
            message: `The request doesn't the authentication header`
        })
    
    let token = req.headers.authorization.replace(/['"]+/g, '')

    try {
        let payload = jwt.decode(token, config.PRIVATE_KEY)
        if (payload.exp <= moment().unix())
            return res.status(401).send({ message: `Token has expired` })
    } catch (ex) {
        return res.status(404).send({ message: `Invalid Token` })
    }
    req.user = payload
    next()
}

module.exports = Auth