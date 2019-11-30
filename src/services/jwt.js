const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

exports.createToken = (user) => {  
  let payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix(),
  }
  return jwt.encode(payload, config.privateKey)
}

exports.decodeToken(token) = () => {
  const decoded = new Promise((resolve, reject) => {
      try {
          const payload = jwt.decode(token, config.privateKey)

          if (payload.exp <= moment().unix()) {
              reject({
                  status: 401,
                  message: 'the token has expired'
              })
          }
          resolve(payload.sub)
      } catch (err) {
          reject({
              status: 500,
              message: 'invalid token'
          })
      }
  })
  return decoded
}
