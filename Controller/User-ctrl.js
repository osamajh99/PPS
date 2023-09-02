const User = require('../Model/User-model')
addUser = (req, res) => {
     const body = req.body
     if (!body) {
          return res.status(400).json({
               success: false,
               error: 'You must provide your information',
          })
     }
     const user = new user(body)
     if (!user) {
        return res.status(400).json({ success: false, error: err })
   }

   user.save().then(() => {
             return res.status(201).json({
                  success: true,
                  id: products._id,
                  message: 'User Added!',
             })
        })
        .catch(error => {
             return res.status(400).json({
                  error,
                  message: 'User not added!',
             })
        })
}
module.exports = {addUser}