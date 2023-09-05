const express = require('express')

const UserCtrl = require('../Controller/User-ctrl')

 const router = express.Router()

 router.post('/AddUser', UserCtrl.addUser)

 module.exports = router

