import Joi from 'joi';

export const userSchema = {
    firstname: Joi.string().min(3).max(20).regex(/^[a-zA-Z]+$/),
    lastname: Joi.string().min(3).max(20).regex(/^[a-zA-Z]+$/),
    age: Joi.number().min(18).max(99),
}

export const createUserSchema = Joi.object({
    firstname: userSchema.firstname.required(),
    lastname: userSchema.lastname,
    age: userSchema.age.required(),
})

export const updateUserSchema = Joi.object({
    firstname: userSchema.firstname,
    lastname: userSchema.lastname,
    age: userSchema.age,
})
