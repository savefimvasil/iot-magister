import * as firebase from 'firebase'
import Vue from 'vue'
const config = require('../../config/firebase.js')

firebase.initializeApp(config)

Vue.prototype.firebase = firebase
