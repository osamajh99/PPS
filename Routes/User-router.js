const express = require('express')

const UserCtrl = require('../Controller/User-ctrl')
const { checkAuthUser, isAdmin  } = require("../Middlewares/checkAuthUser");

 const router = express.Router()

 router.post('/signup',UserCtrl.SignUp)
 router.post('/signIn',UserCtrl.SignIn)
 router.post('/updateuserinfo/:id',[checkAuthUser],UserCtrl.UpdateUserInfo)
 router.delete('/deleteuser/:id',[checkAuthUser,isAdmin], UserCtrl.deleteUser)
 module.exports = router

