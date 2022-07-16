import * as Joi from "joi";


export const SignInValidators = Joi.object({
    email: Joi.string().required(),
    password: Joi.string(),
});

export const SignUpValidators = Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string(),
});