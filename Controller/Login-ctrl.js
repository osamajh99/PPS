const bcrypt = require('bcrypt');
const User = require('../Model/User-model');

 const {loginValidation } = require('../utils/login');
exports.loginvalidator = async (req, res) => {
  const { Email, Password } = req.body;
  const errors = loginValidation({ Email, Password })

  if(errors) {
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

        res.status(200).json({ message: 'You have been logged in successfully.' });
      });
    
};
