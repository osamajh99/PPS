const express = require('express')

const UserCtrl = require('../Controller/User-ctrl')

 const router = express.Router()

 router.post('/signup',UserCtrl.SignUP)

 module.exports = router

