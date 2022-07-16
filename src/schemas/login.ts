import Joi from 'joi';


const login = function loginValidation(user: String ){
    const logSchema = Joi.object({
        email: Joi.string().required().trim().lowercase().email(),
        password: Joi.string().required().min(8).max(12),
    })
    return logSchema.validate(user)
};


export default login;