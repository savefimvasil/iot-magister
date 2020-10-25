const express = require('express')
const path = require('path')
const config = require('./config')
const firebase = require('firebase')
const getAverage = require('./helpers/getAverage')

firebase.initializeApp(config)

const store = firebase.firestore()
const db = firebase.database()
const router = express.Router()

db.ref('room-conditions').orderByKey().limitToLast(1).on('value', async snapshot => {
  snapshot.forEach(item => console.log('snapshot', item.val()))
  try {
    await store.collection('settings').doc('settings').get().then(el => {
      // todo set timeout period in ESP
      console.log('timeout', el.data().timeout)
    })
    await getAverage(store, snapshot)
  } catch (e) {
    console.log(e)
  }
})

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'))
})

router.route('/settings').post(function (req, res) {
  try {
    const body = req.body
    store.collection('settings').doc('settings').set({
      timeout: body.timeout,
      temperature: body.temperature,
      humidity: body.humidity
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
