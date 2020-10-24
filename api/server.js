const express = require('express')
const cors = require('cors')
const firebase = require('firebase')
const config = require('./config.js')
const router = require('./post.route')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3002

firebase.initializeApp(config)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('dist'))
app.use('/', router)

app.listen(PORT, function () {
  console.log('Server is running on Port:', PORT)
})
