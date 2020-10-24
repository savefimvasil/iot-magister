const express = require('express')
const path = require('path')
const config = require('./config')
const firebase = require('firebase')

firebase.initializeApp(config)

const store = firebase.firestore()
const db = firebase.database()
//
// store.collection('room-conditions').orderBy('date', 'desc').limit(1).onSnapshot(function (docs) {
//   store.collection('settings').doc('settings').get().then(el => {
//     // todo set timeout period in ESP
//     console.log('timeout', el.data().timeout)
//   })
//   docs.forEach(doc => {
//     console.log('doc', doc.data())
//   })
// })

db.ref('room-conditions').orderByKey().limitToLast(1).on('value', function (snapshot) {
  store.collection('settings').doc('settings').get().then(el => {
    // todo set timeout period in ESP
    console.log('timeout', el.data().timeout)
  })
  console.log('snapshot', snapshot.forEach(item => console.log(item.val())))
})

const router = express.Router()

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'))
})

router.route('/settings').post(function (req, res) {
  try {
    const body = req.body
    store.collection('settings').doc('settings').set({
      timeout: body.timeout
    })
    res.json({ status: 200, message: 'success' })
  } catch (e) {
    console.log(e)
    res.json({ status: 500, message: 'unable to set timeout' })
  }
})

router.route('/get-settings').post(function (req, res) {
  try {
    store.collection('settings').doc('settings').get().then(el => {
      res.json(el.data())
    })
  } catch (e) {
    res.json({ status: 500, message: 'unable to get timeout' })
  }
})

module.exports = router
