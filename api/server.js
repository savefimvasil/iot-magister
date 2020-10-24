const express = require('express')
const cors = require('cors')
const firebase = require('firebase')
const config = require('../config/firebase.js')
const router = require('./post.route')
const bodyParser = require('body-parser')
// const http = require('http')
// const server = http.createServer()

const app = express()
const PORT = process.env.PORT || 3002

firebase.initializeApp(config)

firebase.firestore().collection('room-conditions').orderBy('date', 'desc').limit(1).onSnapshot(function (docs) {
  docs.forEach(doc => {
    console.log('doc', doc.data())
  })
})


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('dist'))
app.use('/', router)

app.listen(PORT, function () {
  console.log('Server is running on Port:', PORT)
})
