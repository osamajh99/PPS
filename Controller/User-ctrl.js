const User = require('../Model/User-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { SignUpValidation } = require('../utils/validator')
const saltRounds = 10;
const JWT_SECRET = "scriptteam-secret-key";

const SignUp = async (req, res) => {
     // Check if the req.body valid or not
     const { Email, Password, UserName, PhoneNumber, Address, IsAdmin } = req.body
     const errors = SignUpValidation({ Email, Password })

     if (errors) {
          return res.status(400).json({ errors })
     }

     // Check if the Email is already exists 
     const oldUser = await User.findOne({ Email })

     if (oldUser) {
          return res.status(409).json({ error: 'User is already exists' })
     }
     bcrypt.hash(Password, saltRounds, async function (err, hash) {
          // Store hash in your Password DB.
          if (err) {
               return res.status(403).json({ error: 'please try another passowrd' })
          }
          const newUSer = { Email, UserName, PhoneNumber, Address, IsAdmin, Password: hash }
          const dbUser = await User.create(newUSer)
          const token = jwt.sign({
               expiresIn: '1d',
               data: dbUser
          }, JWT_SECRET);
          return res.status(200).json({ token })
     });

}
const UpdateUserInfo = async (req, res) => {
     const { UserName, PhoneNumber, Address } = req.body
     const userId = req.params.id
     const filter = { _id: userId };
     const update = { PhoneNumber: PhoneNumber, Address: Address, UserName: UserName };
     const userObj = await User.findOneAndUpdate(filter, update)
     if (!userObj) {
          return res.status(400).json({ error: 'User Not Found' })
     }
     else {
          return res.status(201).json({
               success: true,
               id: userId,
               message: 'user Updated!',
          })
     }
}
module.exports = {
     SignUp,
     UpdateUserInfo
}