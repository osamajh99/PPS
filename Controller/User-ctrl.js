const User = require('../Model/User-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { SignUpValidation } = require('../utils/validator')
const { loginValidation } = require('../utils/login')

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
          res.status(200).json({ message: 'You have been successfully registered.', dbUser });
     });

}

const SignIn = async (req, res) => {
     const { Email, Password } = req.body
     const errors = loginValidation({ Email, Password })

     if (errors) {
          return res.status(400).json({ errors })
     }
     const user = await User.findOne({ 'Email': Email })
     if (!user) {
          return res.status(404).json({ message: 'There is no registered user with this email.' });
     }

     bcrypt.compare(Password, user.Password, (err, result) => {
          if (err) {
               return res.status(500).json({ message: 'An error occurred while logging in.' });
          }

          if (!result) {
               return res.status(401).json({ message: 'The password is incorrect.' });
          }

          const token = jwt.sign({
               expiresIn: '1d',
               data: user
          }, JWT_SECRET);

          return res.status(200).json({ token, message: 'You have been logged in successfully.' })
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
     SignIn,
     UpdateUserInfo
}