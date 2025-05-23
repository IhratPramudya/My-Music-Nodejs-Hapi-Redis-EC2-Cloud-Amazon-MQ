
import Joi from 'joi';

const registerSchema = Joi.object({
    email: Joi.string().min(6).required().email().message('Must be a valid email address'),
    password: Joi.string().required().min(6).message('Password is required!'),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

export {
    registerSchema,
    loginSchema
}