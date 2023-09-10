const express = require('express')

const login = require('../Controller/Login-ctrl');

 const router = express.Router()

 router.post('/login', login.loginvalidator);

 module.exports = router