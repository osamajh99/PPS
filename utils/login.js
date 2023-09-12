const loginValidation = (body) => {
    const { Email, Password }  = body
    let error = null

    if(!Email || !Password) {
        error = 'Please fill all fields'
    }

    return error
}

module.exports = { loginValidation: loginValidation }