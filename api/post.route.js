const express = require('express')
const path = require('path')

const config = require('./config')

const firebase = require('firebase')
console.log(firebase, config)

const router = express.Router()


router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'))
})

module.exports = router
