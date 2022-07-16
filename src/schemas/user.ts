import Joi from 'joi';

const validate = function validateUser(user: String){
    const schema = Joi.object({
        userName: Joi.string().required().min(6).max(12),
        email: Joi.string().required().trim().lowercase().email(),
        password: Joi.string().required().min(8).max(12),
        confirmPassword: Joi.ref('password'),
    })
    .with('password', 'confirmPassword')

    return schema.validate(user)
};

export default validate;