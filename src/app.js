const express = require('express')
const config_http_headers = require('./middlewares/config_http_headers')
const bodyParser = require('body-parser')
const routes = require('./routes')
const app = express()

app.use(express.json())
app.use(config_http_headers)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)

module.exports = app
