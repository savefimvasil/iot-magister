const express = require('express')
const path = require('path')
const config = require('./config')
const firebase = require('firebase')
const getAverage = require('./helpers/getAverage')
const detectNormal = require('./helpers/detectNormal')

firebase.initializeApp(config)

const store = firebase.firestore()
const db = firebase.database()
const router = express.Router()

db.ref('room-conditions').orderByKey().limitToLast(1).on('value', async snapshot => {
  snapshot.forEach(item => {
    const t = item.val().temperature
    const h = item.val().humidity

    if (!detectNormal('temperature', t)) {
      // off
      console.log('off temp')
    } else {
      // normal
      console.log('normal temp')
    }

    if (!detectNormal('humidity', h)) {
      console.log('off humidity')
    } else {
      // normal
      console.log('normal humidity')
    }
  })

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

router.route('/get-last').post(function (req, res) {
  try {
    db.ref('room-conditions').orderByKey().limitToLast(100).once('value', snapshot => {
      res.json(snapshot.val())
    })
  } catch (e) {
    res.json({ status: 500, message: 'unable to get timeout' })
  }
})

module.exports = router
