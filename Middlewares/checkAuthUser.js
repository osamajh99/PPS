const jwt = require('jsonwebtoken')
const User = require("../Model/User-model");

const checkAuthUser = async (req, res, next) => {
    const token = req.headers['x-access-token']
    if(!token){
        return res.status(401).json({ message: 'not auth'})
    }
    const user = jwt.verify(token, 'scriptteam-secret-key')
    let userX = await User.findById(user.data._id)
    req.user = userX;
    if(!user){
        return res.status(401).json({ message: 'not auth'})
    }

    next()
}
const isAdmin = async (req, res, next) => {
    console.log('IsAdmin',req.user.IsAdmin)
    if (!req.user.IsAdmin)
        return res.status(401).send({ msg: "You are not Admin Role" });

    next();
};

module.exports = { checkAuthUser,isAdmin }