const express = require('express')
const path = require('path')
const config = require('./config')
const firebase = require('firebase')

firebase.initializeApp(config)

firebase.firestore().collection('room-conditions').orderBy('date', 'desc').limit(1).onSnapshot(function (docs) {
  docs.forEach(doc => {
    console.log('doc', doc.data())
  })
})

console.log(firebase.firestore().collection('room-conditions').orderBy('date', 'desc').limit(1))

const router = express.Router()


router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'))
})

module.exports = router
