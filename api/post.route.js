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

const router = express.Router()

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'))
})

router.route('/settings').post(function (req, res) {
  try {
    const body = req.body
    firebase.firestore().collection('settings').doc('settings').set({
      timeout: body.timeout
    })
    res.json({ status: 200, message: 'success' })
  } catch (e) {
    console.log(e)
    res.json({ status: 500, message: 'unable to set timeout' })
  }
})

module.exports = router
