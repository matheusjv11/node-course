import Joi from 'joi'
import { UserType } from '../types/UserType'

export const AuthValidator = Joi.object<UserType>({
    email: Joi.string().email().max(250).required(),
    senha: Joi.string().min(6).max(12).required()
})