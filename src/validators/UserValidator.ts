import Joi from 'joi'
import { UserType } from '../types/UserType'

export const UserValidator = Joi.object<UserType>({
    nome: Joi.string().max(200).required(),
    email: Joi.string().email().max(250).required(),
    senha: Joi.string().min(6).max(12).required()
})