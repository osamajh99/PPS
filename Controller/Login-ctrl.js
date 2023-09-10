const bcrypt = require('bcrypt');
const User = require('../Model/User-model');


//const {login } = require('../utils/login');

exports.loginvalidator = (req, res) => {
  const { Email, Password } = req.body;

  if (!Email(Email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  User.findOne({ Email })
    .then((user) => {
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
    })
    .catch((error) => {
      res.status(500).json({ message: 'An error occurred while logging in.' });
    });
};
