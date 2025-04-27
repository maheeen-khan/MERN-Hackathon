import joi from "joi"

const signupValidation = (req, res, next) => {

    const userSchema = joi.object({
        email: joi.string().email().required(),
        username: joi.string().min(3).max(15).required(),
        password: joi.string().min(6).max(15).required()
    }).unknown(true) // ignore extra fields

    const { error } = userSchema.validate(req.body)
    if (error) {
        return res.status(400).send({ message: error.details[0].message })
    }
    next()
}


const loginValidation = (req, res, next) => {

    const userSchema = joi.object({
        username: joi.string().min(3).max(15).required(),
        password: joi.string().min(6).max(15).required()
    }).unknown(true) // ignore extra fields

    const { error } = userSchema.validate(req.body)
    if (error) {
        return res.status(400).send({ message: error.details[0].message })
    }
    next()
}

export {signupValidation, loginValidation};