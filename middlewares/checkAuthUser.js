const jwt = require('jsonwebtoken')

const checkAuthUser = (req, res, next) => {
    const token = req.headers['x-access-token']
console.log(token)
    if(!token){
        return res.status(401).json({ message: 'not auth'})
    }


    const isVerifed = jwt.verify(token, 'scriptteam-secret-key')


    if(!isVerifed){
        return res.status(401).json({ message: 'not auth'})
    }

    next()

}

module.exports = { checkAuthUser }