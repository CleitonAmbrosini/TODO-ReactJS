const port = 3003

const bodyparser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')

server.use(bodyparser.urlencoded({extend: true}))
server.use(bodyparser.json())
server.use(allowCors)

server.listen(port, function(){
  console.log('rodando na porta 3003')
})

module.exports = server